import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
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

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [
    ScrollRevealDirective,
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
  readonly editorUrl = EXTERNAL_LINKS.editor;
  readonly editorEmbedUrl: SafeResourceUrl;
  readonly features: readonly Feature[] = FEATURES;

  constructor(sanitizer: DomSanitizer) {
    this.editorEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl(EXTERNAL_LINKS.editor);
  }
}
