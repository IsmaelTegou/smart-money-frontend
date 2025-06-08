import { Component } from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Transactions',
      icon: 'pi pi-fw pi-wallet',
      routerLink: '/transactions',
    },
    {
      label: 'Category',
      icon: 'pi pi-fw pi-briefcase',
      routerLink: '/categories',
    }
  ];

}
