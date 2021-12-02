import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, observable, Observable, throwError } from 'rxjs';
import { ReviewMain } from "./review.model";

@Injectable({
  providedIn: 'root'
})
export class Reviewservice {
  private serverUrl = "http://10.0.0.13:9000";
  constructor(private http:HttpClient) { }

  public getReview(hotelid : string, pageNo : number): Observable<ReviewMain[]> {
      return this.http.get<ReviewMain[]>(`${this.serverUrl}/detail/review/${hotelid}?page=${pageNo}`);
  }
  public addReview(review : ReviewMain) {
    return this.http.post(`${this.serverUrl}/review/write`, review, {responseType:"text"});
  } 

  public deleteReview(seq : bigint, userid : string) {
    return this.http.delete(`${this.serverUrl}/review/delete?seq=${seq}&userid=${userid}`, {responseType:"text"});
  }   
    

}

