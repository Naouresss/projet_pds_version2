import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from '../models/User';
import { Registerrequest } from './registerrequest';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:8080/api/user';
  private authTokenKey = 'authToken';


  constructor(private http: HttpClient) { }

  register(registerRequest: Registerrequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register_user`, registerRequest);
  }
  registerinvite(registerRequest: Registerrequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register_invite`, registerRequest);
  }


  storeAuthToken(authToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  getCurrentUser(authToken: string | null): Observable<User> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }
  
  
}
