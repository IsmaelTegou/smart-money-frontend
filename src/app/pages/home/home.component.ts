import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public authService!: AuthService;


}
