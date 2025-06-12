import {Component, OnInit} from '@angular/core';
import {Divider} from 'primeng/divider';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response';


@Component({
    selector: 'app-login',
    imports: [Divider, ReactiveFormsModule, InputText, NgIf,  Button, Ripple],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;
  public isSubmitButtonOn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitButtonOn = true;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password })
      .subscribe({
        next: (response: AuthResponse): void => {
          localStorage.setItem('access_token', response.accessToken);
          this.authService.isAuthenticated = true;
          this.authService.refreshAppState();
          this.router.navigate(['/']).then();
        },
        error: () => {
          this.isSubmitButtonOn = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de connexion',
            detail: 'Email ou mot de passe incorrect.',
          });
        },
      });
  }

  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}

