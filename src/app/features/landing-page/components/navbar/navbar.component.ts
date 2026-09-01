import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowUpRight,
  LucideHome,
  LucideMenu,
  LucideLogIn,
  LucideX,
} from '@lucide/angular';
import { GithubStarBadgeComponent } from '../../../../shared/components/github-star-badge/github-star-badge.component';
import { ProductHuntBadgeComponent } from '../../../../shared/components/product-hunt-badge/product-hunt-badge.component';
import { EXTERNAL_LINKS } from '../../../../shared/constants/external-links';
import { AuthService } from '../../../../shared/services/auth.service';
import type { MotionlyUser } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    GithubStarBadgeComponent,
    ProductHuntBadgeComponent,
    LucideArrowUpRight,
    LucideHome,
    LucideMenu,
    LucideLogIn,
    LucideX,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  readonly logoSrc = 'logo.svg';
  readonly links = EXTERNAL_LINKS;

  /** Whether the page has been scrolled past the "condense" threshold. Drives the scrolled background/border. */
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly currentUser = signal<MotionlyUser | null>(null);

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  async openEditor(event: MouseEvent): Promise<void> {
    event.preventDefault();
    this.closeMenu();
    if (!await this.auth.currentUser()) {
      this.auth.setPendingReturnUrl('/editor');
      void this.router.navigate(['/login'], { queryParams: { returnUrl: '/editor' } });
      return;
    }
    window.location.href = this.links.editor;
  }

  constructor() {
    // SSR-safe: afterNextRender runs only in the browser, after the first render — never on the server.
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      void this.auth.currentUser().then((user) => this.currentUser.set(user));
    });
  }
}
