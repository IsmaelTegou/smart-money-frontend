import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { MenuItem } from 'primeng/api';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { UserRole } from '../models/user-role';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public menuItems: MenuItem[] = [];
    public userRole: string = '';
    public isAuthenticated: boolean = false;
    public isAdmin: boolean = false;
    public isManager: boolean = false;
    public isUser: boolean = false;

    private apiUrl: string = `http://localhost:8080/api/auth`;

    constructor(
        private httpClient: HttpClient,
        private jwtService: JwtService,
        private router: Router
    ) {
        this.refreshAppState();
    }

    public login(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, authRequest);
    }

    public refreshAppState(): void {
        const userRole: string = this.jwtService.getUserRole();
        this.isAuthenticated = !this.jwtService.isTokenExpired();
        this.isAdmin = this.isAuthenticated && userRole === UserRole.ADMIN;
        this.isManager = this.isAuthenticated && userRole === UserRole.MANAGER;
        this.isUser = this.isAuthenticated && userRole === UserRole.USER;
        this.userRole = userRole;
        this.loadMenuForRole();
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.isUser = false;
        this.isManager = false;
        this.loadMenuForRole();
        this.router.navigate(['/login']).then();
    }

    private loadMenuForRole(): void {
        this.menuItems = [
            {
                label: 'Accueil',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/'],
                visible: this.isAuthenticated
            },
            {
                label: 'Transaction',
                icon: 'pi pi-fw pi-wallet',
                routerLink: 'transactions',
                visible: this.isManager || this.isAdmin
            },
            {
                label: 'Category',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: 'categories',
                visible: this.isAdmin
            }
        ];
    }
}
