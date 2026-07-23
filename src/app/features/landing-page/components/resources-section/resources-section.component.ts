import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExternalLinkCardComponent } from '../../../../shared/components/external-link-card/external-link-card.component';
import { RESOURCE_LINKS } from '../../../../shared/constants/external-links';
import { ResourceLink } from '../../../../shared/models/landing.models';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-resources-section',
  standalone: true,
  imports: [ExternalLinkCardComponent, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resources-section.component.html',
  styleUrl: './resources-section.component.css',
})
export class ResourcesSectionComponent {
  readonly resources: readonly ResourceLink[] = RESOURCE_LINKS;
}
