import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { ProductHuntBadgeComponent } from '../../../../shared/components/product-hunt-badge/product-hunt-badge.component';
import { GithubStarBadgeComponent } from '../../../../shared/components/github-star-badge/github-star-badge.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductHuntBadgeComponent, GithubStarBadgeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly logoSrc = 'logo.svg';

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
