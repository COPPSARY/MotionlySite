import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXTERNAL_LINKS, RESOURCE_LINKS } from '../../../../shared/constants/external-links';
import { ResourceLink } from '../../../../shared/models/landing.models';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly logoSrc = 'logo.svg';
  readonly links: readonly ResourceLink[] = RESOURCE_LINKS;
  readonly githubUrl = EXTERNAL_LINKS.github;
  readonly year = new Date().getFullYear();
}
