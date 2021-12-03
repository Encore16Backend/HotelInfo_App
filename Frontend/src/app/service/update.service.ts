import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Updateservice {
  private apiUrl = environment.backEndUrl;
  constructor(private http:HttpClient) { }

  public updateRequest(user: User) {
    console.log(user);
    return this.http.put(`${this.apiUrl}/user/update`, user,  {responseType:'text'})
  }



}
