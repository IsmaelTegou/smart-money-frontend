import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {Toast} from 'primeng/toast'
import {ConfirmDialog} from 'primeng/confirmdialog'

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet, Toast, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smart-money-frontend';
}
