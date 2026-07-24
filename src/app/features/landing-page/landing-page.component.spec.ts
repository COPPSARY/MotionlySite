import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import * as fc from 'fast-check';
import { LandingPageComponent } from './landing-page.component';
import { RESOURCE_LINKS } from '../../shared/constants/external-links';

describe('LandingPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  /**
   * Property 6: Anchor target existence
   * Validates: Requirements 3.3
   *
   * For every in-page anchor rendered anywhere in the LandingPageComponent
   * tree whose href is a fragment of the form "#<id>", an element with that
   * id exists exactly once in the rendered DOM.
   */
  it('has a unique target element for every in-page anchor href (Property 6)', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Discover every in-page ("#<id>") anchor href actually rendered in the
    // tree. Use getAttribute('href') rather than the .href property, since
    // the latter is resolved by the browser into an absolute URL.
    const anchors = Array.from(compiled.querySelectorAll('a'));
    const hashIds = anchors
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => !!href && href.startsWith('#'))
      .map((href) => href.slice(1))
      .filter((id) => id.length > 0);

    // Sanity check: the navbar/hero should have produced the known in-page
    // anchors so this test isn't vacuous. Install is a route now.
    expect(hashIds.length).withContext('should discover at least one in-page anchor').toBeGreaterThan(0);
    expect(hashIds).toEqual(jasmine.arrayContaining(['top', 'features']));

    fc.assert(
      fc.property(fc.constantFrom(...hashIds), (id) => {
        const matches = compiled.querySelectorAll(`#${id}`);
        expect(matches.length)
          .withContext(`expected exactly one element with id="${id}"`)
          .toBe(1);
      }),
    );
  });

  /**
   * Integration test: badge and resource card cardinality
   * Validates: Requirements 1.2, 3.1, 6.1
   *
   * The rendered tree contains exactly one Product Hunt badge in the navbar
   * and exactly one resource card per ResourceKind.
   */
  it('renders exactly one Product Hunt badge in the navbar and one resource card per ResourceKind', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const badges = compiled.querySelectorAll('app-product-hunt-badge');
    expect(badges.length).withContext('expected exactly one product hunt badge').toBe(1);

    const navbarBadge = compiled.querySelector('app-navbar app-product-hunt-badge');
    expect(navbarBadge).withContext('expected a product hunt badge inside the navbar').not.toBeNull();
    expect(compiled.querySelector('app-hero-section app-product-hunt-badge')).toBeNull();

    const resourceCards = compiled.querySelectorAll('app-external-link-card');
    expect(resourceCards.length)
      .withContext('expected one resource card per ResourceKind')
      .toBe(RESOURCE_LINKS.length);
    expect(resourceCards.length).toBe(4);
  });
});
