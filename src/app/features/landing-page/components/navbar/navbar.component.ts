import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideDownload,
  LucideHome,
  LucideInfo,
  LucidePackage,
  LucidePlay,
  LucideRocket,
  LucideTerminal,
} from '@lucide/angular';
import { GithubStarBadgeComponent } from '../../../../shared/components/github-star-badge/github-star-badge.component';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    GithubStarBadgeComponent,
    LucideBookOpen,
    LucideDownload,
    LucideHome,
    LucideInfo,
    LucidePackage,
    LucidePlay,
    LucideRocket,
    LucideTerminal,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly logoSrc = 'logo.svg';
  readonly links = EXTERNAL_LINKS;

  /** Whether the page has been scrolled past the "condense" threshold. Drives the scrolled background/border. */
  protected readonly scrolled = signal(false);

  constructor() {
    // SSR-safe: afterNextRender runs only in the browser, after the first render — never on the server.
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    });
  }
}
