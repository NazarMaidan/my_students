import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./pages/ranking/ranking.component').then(m => m.RankingComponent),
  },
  {
    path: 'random', loadComponent: () => import('./pages/random/random.component').then(m => m.RandomComponent),
  },
  {
    path: 'category', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'config', loadComponent: () => import('./pages/config/config.component').then(m => m.ConfigComponent)
  },
  {
    path: 'achievement', loadComponent: () => import('./pages/achievement/achievement.component').then(m => m.AchievementComponent)
  }
];
