import { Routes } from '@angular/router';
import { CategoryTabsComponent } from './pages/categories/category-tabs/category-tabs.component';
import { TransactionTabsComponent } from './pages/transactions/transaction-tabs/transaction-tabs.component';
import { HomeComponent } from './pages/home/home.component';
import { userGuard } from '@/guards/user.guard';
import { managerGuard } from './guards/manager.guard';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [userGuard]},
  {path: 'categories', component: CategoryTabsComponent, canActivate: [adminGuard]},
  {path: 'transactions', component: TransactionTabsComponent, canActivate: [managerGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
