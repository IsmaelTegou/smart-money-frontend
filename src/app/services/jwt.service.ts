 import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from '../models/Jwt-payload';


@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  public isTokenExpired(): boolean {
    const token: string = this.getToken();
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }

  public getUserRole(): string {
    return this.getJwtPayload()?.role || '';
  }

  private getJwtPayload(): JwtPayload {
    const token: string = this.getToken();
    return this.jwtHelper.decodeToken(token) as JwtPayload;
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
