import { Feature } from '../models/landing.models';

export const FEATURES: readonly Feature[] = [
  {
    id: 'first-draft',
    title: 'Prompt the first draft',
    description: 'Describe your product or idea, then turn it into a polished first scene.',
    icon: 'mouse-pointer',
  },
  {
    id: 'visual-refine',
    title: 'Edit the timeline',
    description: 'Adjust scenes, timing, and transitions directly in the visual editor.',
    icon: 'timeline',
  },
  {
    id: 'final-video',
    title: 'Export the final cut',
    description: 'Preview your work, then export a polished video ready to share.',
    icon: 'download',
  },
];
