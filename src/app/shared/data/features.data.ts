import { Feature } from '../models/landing.models';

export const FEATURES: readonly Feature[] = [
  {
    id: 'first-draft',
    title: 'Author the first draft',
    description: 'Start with normal HTML and scoped CSS. Build semantic scenes and components that stay readable, portable, and ready to animate.',
    icon: 'mouse-pointer',
  },
  {
    id: 'visual-refine',
    title: 'Direct the timeline',
    description: 'Use GSAP to choreograph reveals, masks, stagger, camera movement, and scene handoffs, then refine the mounted composition visually in the editor.',
    icon: 'timeline',
  },
  {
    id: 'final-video',
    title: 'Render the final cut',
    description: 'Preview and scrub the exact browser DOM used for export. Capture PNG frames in the editor or render a deterministic MP4 locally with Chrome and FFmpeg.',
    icon: 'download',
  },
];
