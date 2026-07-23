import { TestBed } from '@angular/core/testing';
import * as fc from 'fast-check';
import { RESOURCE_LINKS } from '../../constants/external-links';
import { ExternalLinkCardComponent } from './external-link-card.component';

describe('ExternalLinkCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkCardComponent],
    }).compileComponents();
  });

  /**
   * Property 1: External link card fidelity
   * Validates: Requirements 9.1, 9.2
   *
   * For any `resource` drawn from `RESOURCE_LINKS`, the rendered anchor
   * `href` equals `resource.url` exactly, and the anchor carries
   * `target="_blank"` and `rel="noopener noreferrer"`.
   */
  it('renders the exact resource url and safe anchor attributes for every resource (Property 1)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...RESOURCE_LINKS), (resource) => {
        const fixture = TestBed.createComponent(ExternalLinkCardComponent);
        fixture.componentInstance.resource = resource;
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const anchor = compiled.querySelector('a');

        expect(anchor).withContext('anchor should render').not.toBeNull();
        expect(anchor?.getAttribute('href')).toBe(resource.url);
        expect(anchor?.getAttribute('target')).toBe('_blank');
        expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
      }),
    );
  });

  /**
   * Property 2: External link icon rendering
   * Validates: Requirements 9.3
   *
   * For any `resource` drawn from `RESOURCE_LINKS`, the card icon area should
   * render a Lucide SVG, and it should never render the raw icon key text.
   */
  it('renders a Lucide SVG icon and never shows the raw icon key text (Property 2)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...RESOURCE_LINKS), (resource) => {
        const fixture = TestBed.createComponent(ExternalLinkCardComponent);
        fixture.componentInstance.resource = resource;
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const iconContainer = compiled.querySelector<HTMLElement>('.link-card__icon');
        const svg = iconContainer?.querySelector('svg');
        const iconText = iconContainer?.textContent ?? '';

        expect(iconContainer).withContext('icon container should render').not.toBeNull();
        expect(svg).withContext('icon svg should render').not.toBeNull();
        expect(iconText).not.toContain(resource.icon);
      }),
    );
  });
});
