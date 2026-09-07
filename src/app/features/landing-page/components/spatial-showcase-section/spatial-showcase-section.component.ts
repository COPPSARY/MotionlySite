import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-spatial-showcase-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spatial-showcase-section.component.html',
  styleUrl: './spatial-showcase-section.component.css',
})
export class SpatialShowcaseSectionComponent {
  readonly pointerX = signal(0);
  readonly pointerY = signal(0);

  readonly videos = [
    { src: 'assets/claude.mp4', label: 'Claude workflow', position: 'top-left' },
    { src: 'assets/kiri-tts.mp4', label: 'KiriTTS voiceover', position: 'top-right' },
    { src: 'assets/notes-app.mp4', label: 'Notes app concept', position: 'bottom-left' },
    { src: 'assets/motionly-web.mp4', label: 'Motionly web', position: 'bottom-right' },
  ] as const;

  onPointerMove(event: PointerEvent): void {
    const element = event.currentTarget as HTMLElement;
    const bounds = element.getBoundingClientRect();
    this.pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    this.pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  }

  resetPointer(): void {
    this.pointerX.set(0);
    this.pointerY.set(0);
  }
}
