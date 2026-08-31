import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginPageComponent } from './features/login/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Motionly - AI Motion Graphics Editor, Open Source',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Log in to Motionly',
  },
  { path: '**', redirectTo: '' },
];
