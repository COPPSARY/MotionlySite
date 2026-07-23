import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

export type CopyState = 'idle' | 'copied' | 'unavailable';

@Component({
  selector: 'app-copy-install-command',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './copy-install-command.component.html',
  styleUrl: './copy-install-command.component.css',
})
export class CopyInstallCommandComponent {
  @Input({ required: true }) command!: string;

  protected readonly copyState = signal<CopyState>('idle');

  private revertTimer: ReturnType<typeof setTimeout> | undefined;

  protected async onCopyClick(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      this.copyState.set('unavailable');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.command);
      this.copyState.set('copied');

      if (this.revertTimer !== undefined) {
        clearTimeout(this.revertTimer);
      }

      this.revertTimer = setTimeout(() => {
        this.copyState.set('idle');
        this.revertTimer = undefined;
      }, 2000);
    } catch {
      this.copyState.set('unavailable');
    }
  }
}
