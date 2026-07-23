import { Feature } from '../models/landing.models';

export const FEATURES: readonly Feature[] = [
  {
    id: 'prompt-to-animation',
    title: 'Prompt to animation',
    description: 'Describe the motion you want in plain language and Motionly generates production-ready animation keyframes.',
    icon: 'sparkles',
  },
  {
    id: 'ai-scene-editing',
    title: 'AI-assisted scene editing',
    description: 'Ask the AI to adjust timing, easing, or layout of any element and see the scene update instantly.',
    icon: 'wand',
  },
  {
    id: 'smart-templates',
    title: 'Smart templates',
    description: 'Start from AI-curated motion templates tailored to your content instead of a blank canvas.',
    icon: 'layout-template',
  },
  {
    id: 'export-anywhere',
    title: 'Export anywhere',
    description: 'Render your motion graphics to common video and animation formats ready for any platform.',
    icon: 'download',
  },
];
