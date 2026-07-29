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
      'Node.js 20.19.0 or newer, npm, and FFmpeg available on your PATH. FFmpeg is only required when you export an animation to MP4 — you can install, edit, and preview projects without it.',
  },
  {
    question: 'Do I need to install Motionly globally?',
    answer:
      'No. The npx command downloads and runs the current version of @coppsary/motionly on demand, so you always scaffold new projects with the latest release and nothing is added to your global npm packages.',
  },
  {
    question: 'Where does Motionly store my animation project?',
    answer:
      'Everything lives in the folder you created: a project.motion file holds the scenes, layers, keyframes, and timing, while images, video, SVG, GIF, Lottie, and audio files sit in the assets folder next to it. Both are plain files you can commit to Git.',
  },
  {
    question: 'Can an AI agent edit a Motionly project?',
    answer:
      'Yes. The .motion format is readable text, so agents such as Claude Code, Codex, or Antigravity can open a project, change a single keyframe or layer, and leave the rest of the animation untouched.',
  },
  {
    question: 'How do I export my animation to MP4?',
    answer:
      'Run the export from the editor once FFmpeg is installed. Motionly renders the timeline locally on your machine, so no project files or assets are uploaded to a server.',
  },
  {
    question: 'Is Motionly free and open source?',
    answer:
      'Motionly is open source and free to install from npm. You can read the source, open issues, and contribute on GitHub.',
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
  readonly installCommand = 'npx @coppsary/motionly init my-video';
  readonly devCommand = 'cd my-video && npx @coppsary/motionly dev';
  readonly editorCommand = 'npx @coppsary/motionly';
  readonly faqs = FAQS;

  constructor() {
    inject(SeoService).apply({
      title: 'Install Motionly - AI Motion Graphics Editor Setup',
      description:
        'Install Motionly with npx, run the local AI motion graphics editor, organise assets, and export editable .motion animation projects to MP4.',
      path: '/getting-started',
      keywords:
        'install Motionly, npx @coppsary/motionly, AI motion graphics editor setup, local animation editor, .motion project, export animation to MP4, FFmpeg animation export',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            name: 'Install Motionly and export your first animation',
            description:
              'Scaffold a Motionly project, run the local editor, add assets, and export the animation to MP4.',
            url: 'https://www.motionly.site/getting-started',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Create a project',
                text: 'Run npx @coppsary/motionly init my-video to scaffold a project.motion file and an assets folder.',
              },
              {
                '@type': 'HowToStep',
                name: 'Run the editor',
                text: 'Run npx @coppsary/motionly dev inside the project folder to open the local editor in your browser.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add assets',
                text: 'Place images, video, SVG, GIF, Lottie, and audio files in the assets folder and reference them from project.motion.',
              },
              {
                '@type': 'HowToStep',
                name: 'Export to MP4',
                text: 'With FFmpeg on your PATH, export the timeline to MP4 locally.',
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
