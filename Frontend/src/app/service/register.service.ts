import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.backEndUrl;
  constructor(private http:HttpClient) {}

  public registerRequest(user: User) {
    return this.http.post(`${this.apiUrl}/user/join`, user, {responseType:'text'});
  }
}
