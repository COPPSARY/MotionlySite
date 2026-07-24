import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CopyInstallCommandComponent } from '../../../../shared/components/copy-install-command/copy-install-command.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CopyInstallCommandComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  readonly installCommand = 'npx @coppsary/motionly init my-video';
}
