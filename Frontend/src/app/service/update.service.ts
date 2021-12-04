import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Updateservice {
  private apiUrl = environment.backEndUrl;

  constructor(private http:HttpClient) { }

  public updateRequest(user: User) {
    return this.http.put(`${this.apiUrl}/user/update`, user,  {responseType:'text'})
  }
}