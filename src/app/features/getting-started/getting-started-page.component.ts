import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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

  constructor(title: Title, meta: Meta) {
    const pageTitle = 'Install Motionly - Getting Started';
    const description =
      'Install Motionly, run the local AI motion graphics editor, organize assets, and export editable .motion animation projects to MP4.';
    const url = 'https://motionly.site/getting-started';

    title.setTitle(pageTitle);
    meta.updateTag({
      name: 'description',
      content: description,
    });
    meta.updateTag({ property: 'og:title', content: pageTitle });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ name: 'twitter:title', content: pageTitle });
    meta.updateTag({ name: 'twitter:description', content: description });
  }
}
