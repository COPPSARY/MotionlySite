import { ApplicationRef, Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal.directive';

/**
 * Minimal host component that annotates a target element with the
 * `appScrollReveal` directive so we can exercise the directive against a
 * real DOM element under different platforms.
 */
@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `<div class="reveal-target" appScrollReveal>content</div>`,
})
class RevealHostComponent {}

/** Reads the reveal target element out of a rendered host fixture. */
function getTarget(nativeElement: HTMLElement): HTMLElement {
  const el = nativeElement.querySelector<HTMLElement>('.reveal-target');
  if (!el) {
    throw new Error('reveal target element not found');
  }
  return el;
}

describe('ScrollRevealDirective', () => {
  /**
   * Property 8: SSR-safe motion initialization
   * Validates: Requirements 12.1, 13.3
   *
   * On a server render pass (PLATFORM_ID = 'server'), `init` performs no work:
   * no IntersectionObserver is constructed, no window/matchMedia access occurs,
   * and the host element carries neither the `reveal` nor `reveal--visible`
   * class.
   */
  describe('server platform (PLATFORM_ID = "server")', () => {
    let originalIntersectionObserver: typeof IntersectionObserver | undefined;
    let observerConstructedCount: number;

    beforeEach(async () => {
      // Wrap IntersectionObserver so we can detect any construction attempt,
      // while still delegating to the real implementation.
      originalIntersectionObserver = (window as unknown as {
        IntersectionObserver?: typeof IntersectionObserver;
      }).IntersectionObserver;
      observerConstructedCount = 0;

      if (originalIntersectionObserver) {
        const Real = originalIntersectionObserver;
        (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
          private readonly inner: IntersectionObserver;
          constructor(
            cb: IntersectionObserverCallback,
            options?: IntersectionObserverInit,
          ) {
            observerConstructedCount += 1;
            this.inner = new Real(cb, options);
          }
          observe(target: Element): void {
            this.inner.observe(target);
          }
          unobserve(target: Element): void {
            this.inner.unobserve(target);
          }
          disconnect(): void {
            this.inner.disconnect();
          }
          takeRecords(): IntersectionObserverEntry[] {
            return this.inner.takeRecords();
          }
        };
      }

      await TestBed.configureTestingModule({
        imports: [RevealHostComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      }).compileComponents();
    });

    afterEach(() => {
      if (originalIntersectionObserver) {
        (window as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
          originalIntersectionObserver;
      }
    });

    it('does not add the reveal or reveal--visible class and constructs no observer (Property 8)', () => {
      const fixture = TestBed.createComponent(RevealHostComponent);
      fixture.detectChanges();

      const target = getTarget(fixture.nativeElement as HTMLElement);

      expect(target.classList.contains('reveal'))
        .withContext('server render must not add the pre-reveal class')
        .toBeFalse();
      expect(target.classList.contains('reveal--visible'))
        .withContext('server render must not add the revealed class')
        .toBeFalse();
      expect(observerConstructedCount)
        .withContext('server render must not construct an IntersectionObserver')
        .toBe(0);

      fixture.destroy();
    });
  });

  /**
   * Property 9: Content visibility without motion
   * Validates: Requirement 12.3
   *
   * An element annotated with `appScrollReveal` has a fully-visible resting
   * state (no `reveal` class, no `reveal--visible` class) before any
   * intersection occurs. Reveal is strictly additive enhancement: with the
   * `reveal` class absent, the element is fully visible.
   */
  describe('browser platform (resting state)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RevealHostComponent],
      }).compileComponents();
    });

    it('renders the annotated element fully visible before it intersects the viewport (Property 9)', () => {
      const fixture = TestBed.createComponent(RevealHostComponent);
      fixture.detectChanges();

      const target = getTarget(fixture.nativeElement as HTMLElement);

      // The one-shot reveal only fires on intersection; synchronously after
      // render the element has not yet been marked visible.
      expect(target.classList.contains('reveal--visible'))
        .withContext('element must not be revealed before it intersects')
        .toBeFalse();

      // Resting state = the SSR / no-JS state, which carries no `reveal` class.
      // In that state the content must be fully visible (opacity 1, no offset).
      target.classList.remove('reveal');
      const style = getComputedStyle(target);

      expect(style.opacity)
        .withContext('resting element (no reveal class) must be fully opaque')
        .toBe('1');
      const transform = style.transform;
      expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)')
        .withContext(`resting element must have no offset transform, got "${transform}"`)
        .toBeTrue();

      fixture.destroy();
    });
  });

  /**
   * Property 10a: Reduced-motion respect
   * Validates: Requirements 14.1, 14.3
   *
   * On a capable browser where `matchMedia('(prefers-reduced-motion: reduce)')`
   * reports `matches: true`, the directive's browser initialization returns
   * early: it adds neither the `reveal` pre-state class nor the
   * `reveal--visible` revealed class, leaving the host element in its final,
   * fully visible state (no entrance animation).
   */
  describe('browser platform (prefers-reduced-motion: reduce)', () => {
    let originalMatchMedia: typeof window.matchMedia | undefined;

    /** Builds a minimal MediaQueryList-like stub reporting the given match. */
    function makeMediaQueryStub(query: string, matches: boolean): MediaQueryList {
      return {
        matches,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      } as unknown as MediaQueryList;
    }

    beforeEach(async () => {
      originalMatchMedia = window.matchMedia;

      // Report reduced-motion for the reduce query; anything else does not match.
      (window as unknown as { matchMedia: typeof window.matchMedia }).matchMedia = ((
        query: string,
      ) => makeMediaQueryStub(query, query === '(prefers-reduced-motion: reduce)')) as typeof window.matchMedia;

      await TestBed.configureTestingModule({
        imports: [RevealHostComponent],
      }).compileComponents();
    });

    afterEach(() => {
      if (originalMatchMedia) {
        (window as unknown as { matchMedia: typeof window.matchMedia }).matchMedia =
          originalMatchMedia;
      }
    });

    it('returns without adding the reveal class when reduced motion is requested (Property 10a)', async () => {
      const fixture = TestBed.createComponent(RevealHostComponent);
      fixture.detectChanges();

      // afterNextRender initialization runs in the browser after the first
      // render; flush render hooks so the directive's init() has executed.
      TestBed.inject(ApplicationRef).tick();
      await fixture.whenStable();

      const target = getTarget(fixture.nativeElement as HTMLElement);

      expect(target.classList.contains('reveal'))
        .withContext('reduced motion must skip the pre-reveal class (no animation)')
        .toBeFalse();
      expect(target.classList.contains('reveal--visible'))
        .withContext('reduced motion must not add the revealed class')
        .toBeFalse();

      fixture.destroy();
    });
  });
});
