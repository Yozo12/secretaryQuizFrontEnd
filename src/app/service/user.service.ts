import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
    let resp = this.http.post<any>('http://localhost:8080/api/user/save', user, { observe: 'response' });
    return resp;
  }
  findByEmail(email: any): Observable<any> {
    let resp = this.http.get<any>('http://localhost:8080/api/user/search-by-email', email);
    return resp;
  }

  login(email: string, password: string): Observable<any> {
    let resp = this.http.get<any>('http://localhost:8080/api/user/login?email=' + email + '&password=' + password);
    return resp;
  }

  getUserById(id:number): Observable<any> {
    let resp = this.http.get<any>('http://localhost:8080/api/user/get?id=' + id);
    return resp;
  }
}
