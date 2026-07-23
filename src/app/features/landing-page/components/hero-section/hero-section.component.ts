import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';
import { ProductHuntBadgeComponent } from '../../../../shared/components/product-hunt-badge/product-hunt-badge.component';
import { CopyInstallCommandComponent } from '../../../../shared/components/copy-install-command/copy-install-command.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductHuntBadgeComponent, CopyInstallCommandComponent, ScrollRevealDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  readonly editorUrl = EXTERNAL_LINKS.editor;
  readonly installCommand = 'npx @coppsary/motionly init my-video';
  readonly demoVideoSrc = 'project.mp4';

  private readonly previewVideo = viewChild<ElementRef<HTMLVideoElement>>('previewVideo');

  constructor() {
    // SSR-safe: the server renders the declarative `autoplay` attribute (Req 15.2),
    // and only here — in the browser, after hydration — do we suppress autoplay when
    // the visitor prefers reduced motion (Req 14.2). No hydration mismatch: this runs
    // post-render and leaves the framed container/first frame visible (Req 15.3).
    afterNextRender(() => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        const video = this.previewVideo()?.nativeElement;
        video?.removeAttribute('autoplay');
        video?.pause();
      }
    });
  }
}

