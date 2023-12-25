import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { CurrentUser, User } from '../models/User';
import { AccountService } from './account.service';
import { Registerrequest } from './registerrequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/api/user";
 
  constructor(private http: HttpClient, private user: AccountService) { }

  getAllUtilisateurs(): Observable<any> {
    return this.http.get(API_URLS.USER_URL + '/users');
  }
  getAllInvites(): Observable<any> {
    return this.http.get(API_URLS.USER_URL + '/invite-users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL + '/register_user', user);
  }
addInviter(user: User): Observable<User> {
  return this.http.post<User>(API_URLS.USER_URL + '/register_invite', user);
}
  login(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL + '/login', user);
  }

  editProfile(id: any, userr: CurrentUser): Observable<CurrentUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.getToken()
    });

    return this.http.put<CurrentUser>(`${this.url}/update_user/${id}/`, userr, { headers });
  }
  editUser(id: any, userr: Registerrequest): Observable<Registerrequest> {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.getToken()
    });
    console.log("URL update "+this.url+"/update_user/"+ id +"/"+"token : "+this.user.getToken())
    return this.http.put<Registerrequest>(`${this.url}/update_user/${id}/`, userr, {headers});
  }

  deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(API_URLS.USER_URL + `/${id}`);
  }

  findUser(id: any): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.getToken()
    });

    return this.http.get<User>(`${API_URLS.USER_URL}/${id}`, { headers });
  }
}
