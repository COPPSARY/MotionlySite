import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
    RouterLink,
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
  readonly editorEmbedUrl: SafeResourceUrl;
  readonly features: readonly Feature[] = FEATURES;
  readonly isAuthenticated = signal(false);

  constructor(sanitizer: DomSanitizer) {
    this.editorEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl(EXTERNAL_LINKS.editor);
    afterNextRender(() => {
      void this.auth.currentUser().then((user) => this.isAuthenticated.set(!!user));
    });
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
