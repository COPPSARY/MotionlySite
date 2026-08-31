import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideBookOpen,
  LucideFolder,
  LucidePlay,
  LucideTerminal,
} from '@lucide/angular';
import { CopyInstallCommandComponent } from '../../shared/components/copy-install-command/copy-install-command.component';
import { ProductHuntBadgeComponent } from '../../shared/components/product-hunt-badge/product-hunt-badge.component';
import { EXTERNAL_LINKS } from '../../shared/constants/external-links';
import { SeoService } from '../../shared/services/seo.service';

interface Faq {
  readonly question: string;
  readonly answer: string;
}

const FAQS: readonly Faq[] = [
  {
    question: 'What do I need before installing Motionly?',
    answer:
      'Node.js 20.19.0 or newer, npm, Chrome or Chromium, and FFmpeg available on your PATH for video rendering.',
  },
  {
    question: 'Do I need to install Motionly globally?',
    answer:
      'No. Motionly runs locally from a normal Vite project. Clone the repository, install dependencies, and start the editor with npm.',
  },
  {
    question: 'Where does Motionly store my animation project?',
    answer:
      'A composition uses an HTML template, scoped CSS, a GSAP timeline, and a small TypeScript adapter. Keep those files and any media assets together in Git.',
  },
  {
    question: 'Can I edit a Motionly project with a coding agent?',
    answer:
      'Yes. The source is plain HTML, CSS, JavaScript, and TypeScript, so any coding agent can inspect and adjust a scene or timeline directly.',
  },
  {
    question: 'How do I export my animation to MP4?',
    answer:
      'Run npm run render:video after installing Chrome/Chromium and FFmpeg. Motionly seeks the browser composition frame by frame and pipes PNG frames into FFmpeg locally.',
  },
  {
    question: 'Is Motionly free and open source?',
    answer:
      'Motionly is open source and available on GitHub. You can run the editor locally, inspect the source, and contribute to the project.',
  },
];

@Component({
  selector: 'app-getting-started-page',
  standalone: true,
  imports: [
    RouterLink,
    CopyInstallCommandComponent,
    ProductHuntBadgeComponent,
    LucideArrowLeft,
    LucideBookOpen,
    LucideFolder,
    LucidePlay,
    LucideTerminal,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './getting-started-page.component.html',
  styleUrl: './getting-started-page.component.css',
})
export class GettingStartedPageComponent {
  readonly docsUrl = EXTERNAL_LINKS.docs;
  readonly demoUrl = EXTERNAL_LINKS.editor;
  readonly githubUrl = EXTERNAL_LINKS.github;
  readonly installCommand = 'git clone https://github.com/COPPSARY/Motionly.git';
  readonly devCommand = 'npm install && npm run dev';
  readonly editorCommand = 'npm run render:video';
  readonly faqs = FAQS;

  constructor() {
    inject(SeoService).apply({
      title: 'Install Motionly - HTML and GSAP Motion Editor',
      description:
        'Clone Motionly, run the local HTML and GSAP motion graphics editor, author compositions, and render video with Chrome and FFmpeg.',
      path: '/getting-started',
      keywords:
        'install Motionly, HTML animation editor, GSAP timeline, local motion graphics editor, browser rendering, FFmpeg animation export',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            name: 'Install Motionly and export your first animation',
            description:
              'Clone Motionly, run the local editor, author a composition, and export the animation to MP4.',
            url: 'https://www.motionly.site/getting-started',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Create a project',
                text: 'Clone the Motionly repository and install its dependencies.',
              },
              {
                '@type': 'HowToStep',
                name: 'Run the editor',
                text: 'Run npm run dev to open the local editor in your browser.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add assets',
                text: 'Author the visual composition in HTML/CSS and choreograph it with a GSAP timeline.',
              },
              {
                '@type': 'HowToStep',
                name: 'Export to MP4',
                text: 'With Chrome or Chromium and FFmpeg available, render the timeline to MP4 locally.',
              },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ],
      },
    });
  }
}
