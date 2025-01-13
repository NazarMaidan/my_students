import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'wheel', loadComponent: () => import('./pages/wheel/wheel.component').then(m => m.WheelComponent),
  },
  {
    path: 'second', loadComponent: () => import('./pages/second/second.component').then(m => m.SecondComponent)
  },
  {
    path: 'category', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent)
  }
];
