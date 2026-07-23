import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResourceLink } from '../../models/landing.models';

@Component({
  selector: 'app-external-link-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './external-link-card.component.html',
  styleUrl: './external-link-card.component.css',
})
export class ExternalLinkCardComponent {
  @Input({ required: true }) resource!: ResourceLink;
}
