import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':projectSlug/detail',
    loadComponent: () => import('../components/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  {
    path: '',
    loadComponent: () => import('../components/home.component').then(m => m.HomeComponent)
  }
];
