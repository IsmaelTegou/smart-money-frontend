import { Component } from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {CategoryComponent} from '../../pages/category/category.component';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    Button,
    CategoryComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Transaction',
      icon: 'pi pi-fw pi-wallet',
    },
    {
      label: 'Category',
      icon: 'pi pi-fw pi-briefcase',
    }
  ];

}
