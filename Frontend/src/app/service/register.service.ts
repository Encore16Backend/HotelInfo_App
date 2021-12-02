import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://localhost:8080';
  constructor(private http:HttpClient) {}

  public registerRequest(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/join`, user)
  }
}
