import { Routes } from '@angular/router';
import { CategoryTabsComponent } from './pages/categories/category-tabs/category-tabs.component';
import { TransactionTabsComponent } from './pages/transactions/transaction-tabs/transaction-tabs.component';


export const routes: Routes = [
  {path:'', redirectTo: 'transactions', pathMatch: 'full'},
  {path: 'categories', component: CategoryTabsComponent},
  { path: 'transactions', component: TransactionTabsComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
