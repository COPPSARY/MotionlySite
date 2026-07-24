import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

const AGENT_LOGOS = [
  { name: 'Codex', src: 'assets/codex-color.svg' },
  { name: 'Claude Code', src: 'assets/claude-code-color.svg' },
  { name: 'Antigravity', src: 'assets/antigravity-color.svg' },
] as const;

@Component({
  selector: 'app-showcase-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './showcase-section.component.html',
  styleUrl: './showcase-section.component.css',
})
export class ShowcaseSectionComponent {
  readonly agents = AGENT_LOGOS;
  readonly skillDocsUrl = 'https://motionly.mintlify.app/agents/ai-authoring#install-the-skill';
}
