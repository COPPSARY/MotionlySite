import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EXTERNAL_LINKS } from '../../constants/external-links';

export type ProductHuntBadgeSize = 'compact' | 'featured';

@Component({
  selector: 'app-product-hunt-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-hunt-badge.component.html',
  styleUrl: './product-hunt-badge.component.css',
})
export class ProductHuntBadgeComponent {
  @Input() size: ProductHuntBadgeSize = 'featured';

  readonly href = EXTERNAL_LINKS.productHuntEmbed;
  readonly badgeSrc =
    'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1202670&theme=light&t=1784869687158';
}
