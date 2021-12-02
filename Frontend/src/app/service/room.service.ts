import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomInfo } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private serverUrl = "http://10.0.0.13:9000";

  constructor(private http:HttpClient) { }

  public getRoomInfo(hotelid:string):Observable<RoomInfo[]>{
    return this.http.get<RoomInfo[]>(`${this.serverUrl}/detail/room/${hotelid}`);
  }

}
