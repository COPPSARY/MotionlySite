import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideBookOpen } from '@lucide/angular';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-showcase-section',
  standalone: true,
  imports: [ScrollRevealDirective, LucideBookOpen],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './showcase-section.component.html',
  styleUrl: './showcase-section.component.css',
})
export class ShowcaseSectionComponent {
  readonly skillDocsUrl = 'https://motionly.mintlify.app/agents/ai-authoring#install-the-skill';
}
