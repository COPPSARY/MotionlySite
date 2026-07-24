import { Feature } from '../models/landing.models';

export const FEATURES: readonly Feature[] = [
  {
    id: 'first-draft',
    title: 'Ask for the First Draft',
    description: 'Give an AI agent your story, copy, timing, and assets. Instead of returning a flat, un-editable video file where a single typo forces a complete rerender, Motionly generates a structured project format where every element stays fully editable.',
    icon: 'mouse-pointer',
  },
  {
    id: 'visual-refine',
    title: 'Visual Overrides & Refine',
    description: 'Skip the token-burning code scripts and steep learning curves. Your agent draft loads instantly onto a visual canvas and timeline, letting you adjust layers, timing, easing, and playback by hand—no complex code tweaking or design suite mastery required.',
    icon: 'timeline',
  },
  {
    id: 'final-video',
    title: 'Ship the Final Video',
    description: 'Export your high-quality MP4 locally after the visual pass. Because the entire system runs on a clean, structured schema behind the scenes, you can easily feed dynamic data directly into the project structure to scale video variations, auto-generate personalized product demos, and keep your production assets sitting cleanly right beside your development stack.',
    icon: 'download',
  },
];
