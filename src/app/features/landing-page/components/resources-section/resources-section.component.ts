import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalLinkCardComponent } from '../../../../shared/components/external-link-card/external-link-card.component';
import { EXTERNAL_LINKS, RESOURCE_LINKS } from '../../../../shared/constants/external-links';
import { ResourceLink } from '../../../../shared/models/landing.models';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-resources-section',
  standalone: true,
  imports: [ExternalLinkCardComponent, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resources-section.component.html',
  styleUrl: './resources-section.component.css',
})
export class ResourcesSectionComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  readonly resources: readonly ResourceLink[] = RESOURCE_LINKS;
  readonly editorUrl = EXTERNAL_LINKS.editor;

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
