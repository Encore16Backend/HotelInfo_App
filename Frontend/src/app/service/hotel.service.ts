import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HotelMain } from '../model/hotel.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private serverUrl=environment.backEndUrl;

  constructor(private http: HttpClient) { }

  public getHotels(pageNo : number): Observable<HotelMain[]> {
    return this.http.get<HotelMain[]>(`${this.serverUrl}/main/hotel?page=${pageNo}`)
    .pipe(map((data : any) => data.content),
      catchError(_error => {
        return throwError("불러오기 실패");
      })
    );
  }

  public SearchHotelList(keyword1:string, keyword2:string, pageNo:number): Observable<HotelMain[]>{
    return this.http.get<HotelMain[]>(`${this.serverUrl}/main/search?page=${pageNo}&keyword1=${keyword1}&keyword2=${keyword2}`)
  }
}