import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Applies a Raycast-style "fade/slide-up on enter" reveal to its host element as
 * it scrolls into the viewport, using the native `IntersectionObserver`.
 *
 * SSR-safe: the observer is only ever created in the browser (guarded via
 * `isPlatformBrowser` + `afterNextRender`). On the server, under
 * `prefers-reduced-motion: reduce`, or when `IntersectionObserver` is
 * unavailable, the directive is a no-op and the host element stays in its
 * final, fully visible state.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  /** Optional stagger/delay hint (ms) applied as an inline transition-delay. */
  @Input('appScrollReveal') delayMs = 0;

  /** Fraction of the element visible before it reveals. */
  @Input() revealThreshold = 0.15;

  constructor() {
    // afterNextRender runs ONLY in the browser, after the first render — never on the server.
    afterNextRender(() => this.init());
    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());
  }

  private init(): void {
    // Guard clauses keep this a no-op unless we are truly in a capable browser.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      // Leave the element in its final, visible state — no animation.
      return;
    }

    // Move to the pre-reveal state, then observe for entry.
    this.renderer.addClass(this.el.nativeElement, 'reveal');
    if (this.delayMs > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.delayMs}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'reveal--visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: this.revealThreshold },
    );
    this.observer.observe(this.el.nativeElement);
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
