import { ResourceLink } from '../models/landing.models';

export const EXTERNAL_LINKS = {
  productHunt: 'https://www.producthunt.com/products/motionly',
  productHuntEmbed:
    'https://www.producthunt.com/products/motionly?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-motionly-2',
  github: 'https://github.com/COPPSARY/Motionly',
  docs: 'https://motionly.mintlify.app/',
  npm: 'https://www.npmjs.com/package/@coppsary/motionly',
  editor: 'https://motionly-tau.vercel.app/editor',
} as const;

export const RESOURCE_LINKS: readonly ResourceLink[] = [
  {
    id: 'docs',
    title: 'Documentation',
    description: 'Guides and API reference for Motionly.',
    url: EXTERNAL_LINKS.docs,
    icon: 'book',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Source code, issues, and releases.',
    url: EXTERNAL_LINKS.github,
    icon: 'github',
  },
  {
    id: 'npm',
    title: 'npm package',
    description: '@coppsary/motionly on the npm registry.',
    url: EXTERNAL_LINKS.npm,
    icon: 'package',
  },
  {
    id: 'editor',
    title: 'Live Editor',
    description: 'Try Motionly directly in your browser.',
    url: EXTERNAL_LINKS.editor,
    icon: 'play',
  },
];
