import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EXTERNAL_LINKS } from '../../shared/constants/external-links';
import { SeoService } from '../../shared/services/seo.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { ShowcaseSectionComponent } from './components/showcase-section/showcase-section.component';
import { ResourcesSectionComponent } from './components/resources-section/resources-section.component';
import { FooterComponent } from './components/footer/footer.component';

const COPPSARY_MEMBERS = [
  { name: 'Reaksa', github: 'PromSereyreaksa' },
  { name: 'Davann', github: 'imposter-dot-com' },
  { name: 'Ilong', github: 'Chea-Ilong' },
  { name: 'Panha', github: 'Nhaaa4' },
  { name: 'Sophanith', github: 'nithkidd' },
  { name: 'Heang', github: 'Bunheang360' },
] as const;

@Component({
  selector: 'app-landing-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    ShowcaseSectionComponent,
    ResourcesSectionComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  readonly repositoryUrl = EXTERNAL_LINKS.github;
  readonly members = COPPSARY_MEMBERS.map((member) => ({
    ...member,
    url: `https://github.com/${member.github}`,
    avatar: `https://github.com/${member.github}.png`,
  }));

  constructor() {
    inject(SeoService).apply({
      title: 'Motionly - AI Motion Graphics Editor, Open Source',
      description:
        'Open source AI motion graphics editor. Turn prompts into editable animations, refine them visually on a timeline, and export MP4 locally.',
      path: '/',
      keywords:
        'AI motion graphics editor, AI animation generator, text to animation, prompt to video, open source motion graphics software, SVG animation tool, MP4 export, motion graphics for developers, .motion file',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Motionly',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'macOS, Windows, Linux',
        url: 'https://www.motionly.site/',
        image: 'https://www.motionly.site/social-preview.png',
        description:
          'Motionly is an open source AI motion graphics editor for editable animation projects, visual timeline editing, readable .motion files, and local MP4 export.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        creator: {
          '@type': 'Organization',
          name: 'COPPSARY',
          url: 'https://github.com/COPPSARY',
        },
      },
    });
  }
}
