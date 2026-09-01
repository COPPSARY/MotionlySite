import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowUpRight,
  LucideCode2,
  LucideDownload,
  LucideMousePointer2,
  LucideSparkles,
  LucideTimerReset,
} from '@lucide/angular';
import { FEATURES } from '../../../../shared/data/features.data';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';
import { Feature } from '../../../../shared/models/landing.models';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [
    ScrollRevealDirective,
    LucideArrowUpRight,
    LucideCode2,
    LucideDownload,
    LucideMousePointer2,
    LucideSparkles,
    LucideTimerReset,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  readonly editorUrl = EXTERNAL_LINKS.editor;
  readonly features: readonly Feature[] = FEATURES;

  playPreview(video: HTMLVideoElement): void {
    void video.play().catch(() => undefined);
  }

  async openEditor(event: MouseEvent): Promise<void> {
    event.preventDefault();
    if (!await this.auth.currentUser()) {
      this.auth.setPendingReturnUrl('/editor');
      void this.router.navigate(['/login'], { queryParams: { returnUrl: '/editor' } });
      return;
    }
    window.location.href = this.editorUrl;
  }
}
