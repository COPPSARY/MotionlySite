import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../landing-page/components/navbar/navbar.component';
import { FooterComponent } from '../landing-page/components/footer/footer.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
})
export class PricingPageComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Pricing - Motionly',
      description: 'Explore Motionly plans for creating, refining, and shipping polished motion graphics.',
      path: '/pricing',
      keywords: 'Motionly pricing, motion graphics plans, video creation pricing',
    });
  }
}
