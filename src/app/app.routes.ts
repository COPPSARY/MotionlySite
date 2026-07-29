import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { GettingStartedPageComponent } from './features/getting-started/getting-started-page.component';
import { AboutPageComponent } from './features/about/about-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Motionly - AI Motion Graphics Editor, Open Source',
  },
  {
    path: 'getting-started',
    component: GettingStartedPageComponent,
    title: 'Install Motionly - AI Motion Graphics Editor Setup',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About Motionly - Open Source AI Animation Tool',
  },
  { path: '**', redirectTo: '' },
];
