import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDownload, LucideLayoutTemplate, LucideSparkles, LucideWand } from '@lucide/angular';
import { FEATURES } from '../../../../shared/data/features.data';
import { Feature } from '../../../../shared/models/landing.models';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [ScrollRevealDirective, LucideSparkles, LucideWand, LucideLayoutTemplate, LucideDownload],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {
  readonly features: readonly Feature[] = FEATURES;
}
