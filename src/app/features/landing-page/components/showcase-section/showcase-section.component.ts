import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

export interface HowItWorksStep {
  readonly id: string;
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: 'describe',
    step: '01',
    title: 'Describe the motion',
    description:
      'Write a plain-language prompt — animation as code, no timeline or keyframes required to start.',
  },
  {
    id: 'generate',
    step: '02',
    title: 'AI generates the scene',
    description:
      'Motionly turns your prompt into a full motion graphics scene you can keep refining with the AI agent.',
  },
  {
    id: 'export',
    step: '03',
    title: 'Export production-ready',
    description: 'Render the result to common video formats, ready to drop into any platform.',
  },
];

@Component({
  selector: 'app-showcase-section',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './showcase-section.component.html',
  styleUrl: './showcase-section.component.css',
})
export class ShowcaseSectionComponent {
  readonly editorUrl = EXTERNAL_LINKS.editor;
  readonly steps: readonly HowItWorksStep[] = HOW_IT_WORKS_STEPS;
}
