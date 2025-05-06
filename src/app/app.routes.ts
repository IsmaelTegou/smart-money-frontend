import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { CategoryTabsComponent } from './pages/categories/category-tabs/category-tabs.component';


export const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'categories', component: CategoryTabsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
