import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { EXTERNAL_LINKS } from '../../shared/constants/external-links';
import { SeoService } from '../../shared/services/seo.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { ShowcaseSectionComponent } from './components/showcase-section/showcase-section.component';
import { ResourcesSectionComponent } from './components/resources-section/resources-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

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
    ScrollRevealDirective,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  private readonly changeDetector = inject(ChangeDetectorRef);
  readonly repositoryUrl = EXTERNAL_LINKS.github;
  readonly members = COPPSARY_MEMBERS.map((member) => ({
    ...member,
    url: `https://github.com/${member.github}`,
    avatar: `https://github.com/${member.github}.png`,
  }));
  readonly activeWorkflowStep = signal(0);
  private workflowTrack?: HTMLElement;
  private workflowSection?: HTMLElement;

  constructor() {
    inject(SeoService).apply({
      title: 'Motionly - HTML and GSAP Motion Graphics Editor',
      description:
        'Open source HTML and GSAP motion graphics editor. Author editable compositions, refine them visually on a timeline, and render video locally.',
      path: '/',
      keywords:
        'HTML motion graphics editor, GSAP animation tool, visual timeline editor, SVG animation, browser rendering, MP4 export',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Motionly',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'macOS, Windows, Linux',
        url: 'https://www.motionly.site/',
        image: 'https://www.motionly.site/social-preview.png',
        description:
          'Motionly is an open source HTML and GSAP motion graphics editor for editable animation projects, visual timeline editing, and local video rendering.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        creator: {
          '@type': 'Organization',
          name: 'COPPSARY',
          url: 'https://github.com/COPPSARY',
        },
      },
    });

    afterNextRender(() => {
      // Do not restore an old anchor position when the landing page is refreshed.
      if (window.location.hash) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      this.workflowTrack = document.querySelector<HTMLElement>('.workflow__timeline') ?? undefined;
      this.workflowSection = document.querySelector<HTMLElement>('.workflow') ?? undefined;
      if (!this.workflowTrack || !this.workflowSection) return;
      this.updateWorkflowStep();
    });
  }

  updateWorkflowStep(): void {
    if (!this.workflowTrack || !this.workflowSection) return;
    const panelWidth = Math.max(1, this.workflowTrack.clientWidth);
    const step = Math.max(0, Math.min(3, Math.round(this.workflowTrack.scrollLeft / panelWidth)));
    this.activeWorkflowStep.set(step);
    this.changeDetector.detectChanges();
  }

  goToWorkflowStep(step: number): void {
    if (!this.workflowTrack) return;
    const safeStep = Math.max(0, Math.min(3, step));
    const panels = this.workflowTrack.querySelectorAll<HTMLElement>('.workflow__step');
    const targetPanel = panels.item(safeStep);
    if (!targetPanel) return;
    this.activeWorkflowStep.set(safeStep);
    this.changeDetector.markForCheck();
    const trackBounds = this.workflowTrack.getBoundingClientRect();
    const panelBounds = targetPanel.getBoundingClientRect();
    const targetLeft = Math.max(0, this.workflowTrack.scrollLeft + panelBounds.left - trackBounds.left);
    this.workflowTrack.scrollLeft = targetLeft;
    targetPanel.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
    this.updateWorkflowStep();
  }
}
