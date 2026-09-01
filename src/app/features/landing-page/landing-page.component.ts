import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, signal } from '@angular/core';
import { EXTERNAL_LINKS } from '../../shared/constants/external-links';
import { SeoService } from '../../shared/services/seo.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { ShowcaseSectionComponent } from './components/showcase-section/showcase-section.component';
import { ResourcesSectionComponent } from './components/resources-section/resources-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LucideMessagesSquare } from '@lucide/angular';

const COPPSARY_MEMBERS = [
  { name: 'Reaksa', github: 'PromSereyreaksa' },
  { name: 'Davann', github: 'imposter-dot-com' },
  { name: 'Ilong', github: 'Chea-Ilong' },
  { name: 'Panha', github: 'Nhaaa4' },
  { name: 'Sophanith', github: 'nithkidd' },
  { name: 'Heang', github: 'Bunheang360' },
] as const;

const TESTIMONIALS = [
  {
    quote:
      'I spent hours looking for the right starting point for a feature promotion. Motionly helps me create the direction, then shape the details until it feels right.',
    author: 'Prom Sereyreaksa',
    role: 'Founder, Motionly',
  },
  {
    quote:
      'The best part is that the first generation is not the finish line. I can adjust the scenes and pacing directly instead of rewriting the same prompt.',
    author: 'Early Motionly user',
    role: 'Product team',
  },
  {
    quote:
      'Motionly gives the speed of generative video without taking away the decisions that make a launch feel like your product.',
    author: 'Motionly community',
    role: 'Early access feedback',
  },
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
    LucideMessagesSquare,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnDestroy {
  private readonly changeDetector = inject(ChangeDetectorRef);
  readonly repositoryUrl = EXTERNAL_LINKS.github;
  readonly members = COPPSARY_MEMBERS.map((member) => ({
    ...member,
    url: `https://github.com/${member.github}`,
    avatar: `https://github.com/${member.github}.png`,
  }));
  readonly testimonials = TESTIMONIALS;
  readonly activeTestimonial = signal(0);
  readonly activeWorkflowStep = signal(0);
  private workflowTrack?: HTMLElement;
  private workflowSection?: HTMLElement;
  private testimonialTimer?: number;

  ngOnDestroy(): void {
    if (this.testimonialTimer !== undefined && typeof window !== 'undefined') {
      window.clearInterval(this.testimonialTimer);
    }
  }

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

      this.testimonialTimer = window.setInterval(() => this.nextTestimonial(), 6500);

      this.workflowTrack = document.querySelector<HTMLElement>('.workflow__timeline') ?? undefined;
      this.workflowSection = document.querySelector<HTMLElement>('.workflow') ?? undefined;
      if (!this.workflowTrack || !this.workflowSection) return;
      this.updateWorkflowStep();
    });
  }

  nextTestimonial(): void {
    this.activeTestimonial.update((index) => (index + 1) % this.testimonials.length);
    this.changeDetector.markForCheck();
  }

  previousTestimonial(): void {
    this.activeTestimonial.update((index) => (index - 1 + this.testimonials.length) % this.testimonials.length);
    this.changeDetector.markForCheck();
  }

  goToTestimonial(index: number): void {
    this.activeTestimonial.set(Math.max(0, Math.min(this.testimonials.length - 1, index)));
    this.changeDetector.markForCheck();
  }

  updateWorkflowStep(): void {
    if (!this.workflowTrack || !this.workflowSection) return;
    const trackBounds = this.workflowTrack.getBoundingClientRect();
    const trackCenter = trackBounds.left + trackBounds.width / 2;
    const panels = Array.from(this.workflowTrack.querySelectorAll<HTMLElement>('.workflow__step'));
    const step = panels.reduce((closestIndex, panel, index) => {
      const panelBounds = panel.getBoundingClientRect();
      const closestPanel = panels[closestIndex]?.getBoundingClientRect();
      if (!closestPanel) return index;
      return Math.abs(panelBounds.left + panelBounds.width / 2 - trackCenter)
        < Math.abs(closestPanel.left + closestPanel.width / 2 - trackCenter)
        ? index
        : closestIndex;
    }, 0);
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
    const targetLeft = Math.max(
      0,
      this.workflowTrack.scrollLeft + panelBounds.left - trackBounds.left,
    );
    this.workflowTrack.scrollLeft = targetLeft;
  }
}
