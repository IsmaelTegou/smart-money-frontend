import { Routes } from '@angular/router';
import {CategoryPageComponent} from './pages/categories/category-page/category-page.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'categories', component: CategoryPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
