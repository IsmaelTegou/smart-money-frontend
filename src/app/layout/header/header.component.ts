import { Component, inject } from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    Button,
    Tooltip
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public authService: AuthService = inject(AuthService);

  logout(): void{
    this.authService.logout();
  }

}
