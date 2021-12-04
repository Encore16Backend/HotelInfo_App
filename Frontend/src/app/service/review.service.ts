import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ReviewMain } from "../model/review.model";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Reviewservice {
  private serverUrl = environment.backEndUrl;
  
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
  public getMyReview(userid : string, pageNo : number) {
    return this.http.get(`${this.serverUrl}/review/myReview/${userid}?page=${pageNo}`);
  }
}

