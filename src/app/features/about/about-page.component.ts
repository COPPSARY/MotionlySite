import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../landing-page/components/navbar/navbar.component';
import { FooterComponent } from '../landing-page/components/footer/footer.component';
import { EXTERNAL_LINKS } from '../../shared/constants/external-links';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  readonly docsUrl = EXTERNAL_LINKS.docs;
  readonly githubUrl = EXTERNAL_LINKS.github;

  constructor(title: Title, meta: Meta) {
    const pageTitle = 'About Motionly - AI motion graphics editor';
    const description =
      'Learn about Motionly, an AI-native motion graphics editor by COPPSARY for editable animation projects, prompt to MP4 workflows, visual editing, and readable .motion source files.';
    const url = 'https://motionly.site/about';

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
