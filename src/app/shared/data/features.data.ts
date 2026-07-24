import { Feature } from '../models/landing.models';

export const FEATURES: readonly Feature[] = [
  {
    id: 'visual-editor',
    title: 'Ask for the first draft',
    description: 'Give an agent your story, copy, timing, and assets. Motionly gives it a project format that stays editable.',
    icon: 'mouse-pointer',
  },
  {
    id: 'motion-source',
    title: 'Review readable source',
    description: 'Generated scenes live in a version-friendly .motion file, so diffs and follow-up prompts stay precise.',
    icon: 'code',
  },
  {
    id: 'timeline',
    title: 'Refine visually',
    description: 'Open the agent draft on a canvas and timeline, then adjust layers, timing, easing, and playback by hand.',
    icon: 'timeline',
  },
  {
    id: 'mp4-export',
    title: 'Ship the final video',
    description: 'Export MP4 locally after the visual pass, with project assets and source still sitting beside your code.',
    icon: 'download',
  },
];
