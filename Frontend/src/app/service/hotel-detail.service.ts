import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, observable, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HotelMain } from '../model/hotel.model';
import { HotelDetailMain } from '../model/hotelDetail.model';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailService {
  private serverUrl=environment.backEndUrl;

  constructor(private http:HttpClient) { }

  public getHotelDetail(hotelid:String):Observable<HotelDetailMain>{
    return this.http.get<HotelDetailMain>(`${this.serverUrl}/detail/hotel/${hotelid}`);
  }

  public getOneHotel(hotelid:String):Observable<HotelMain>{
    return this.http.get<HotelMain>(`${this.serverUrl}/detail/adhotel/${hotelid}`);
  }

}
