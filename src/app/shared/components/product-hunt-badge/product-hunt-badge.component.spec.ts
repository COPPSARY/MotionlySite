import { TestBed } from '@angular/core/testing';
import * as fc from 'fast-check';
import { EXTERNAL_LINKS } from '../../constants/external-links';
import { ProductHuntBadgeComponent, ProductHuntBadgeSize } from './product-hunt-badge.component';

describe('ProductHuntBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHuntBadgeComponent],
    }).compileComponents();
  });

  /**
   * Property 2: Product Hunt badge fidelity
   * Validates: Requirements 2.1, 2.2, 2.3
   *
   * For any value of `size`, the rendered anchor `href` equals
   * `EXTERNAL_LINKS.productHuntEmbed` and the rendered `<img src>` equals the
   * fixed badge SVG URL. `size` must only affect presentation, never the
   * href/src values.
   */
  it('renders the fixed href and img src for every size value (Property 2)', () => {
    fc.assert(
      fc.property(fc.constantFrom<ProductHuntBadgeSize>('compact', 'featured'), (size) => {
        const fixture = TestBed.createComponent(ProductHuntBadgeComponent);
        fixture.componentInstance.size = size;
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const anchor = compiled.querySelector('a');
        const img = compiled.querySelector('img');

        expect(anchor).withContext('anchor should render').not.toBeNull();
        expect(img).withContext('img should render').not.toBeNull();

        expect(anchor?.getAttribute('href')).toBe(EXTERNAL_LINKS.productHuntEmbed);
        expect(img?.getAttribute('src')).toBe(
          'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1202670&theme=dark&t=1784794416535',
        );
      }),
    );
  });
});
