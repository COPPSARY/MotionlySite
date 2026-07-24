import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { GettingStartedPageComponent } from './features/getting-started/getting-started-page.component';
import { AboutPageComponent } from './features/about/about-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Motionly - AI-native motion graphics editor',
  },
  {
    path: 'getting-started',
    component: GettingStartedPageComponent,
    title: 'Get Started with Motionly',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    title: 'About Motionly',
  },
  { path: '**', redirectTo: '' },
];
