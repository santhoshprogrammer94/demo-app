import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
const accessTokenKey = 'token';
const roleKey = 'role';

@Injectable({
  providedIn: 'root',
})

export class AuthHelperService {
 
  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  }

  removeAccessToken(): void {
    localStorage.removeItem(accessTokenKey);
  }


}
