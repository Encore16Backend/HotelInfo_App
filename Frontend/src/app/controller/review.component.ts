import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewMain } from '../model/review.model';
import { Reviewservice } from '../service/review.service';
import { HotelMain } from '../model/hotel.model';

@Component({
  selector: 'app-review',
  templateUrl: '../view/review.component.html',
  styleUrls: ['../view/review.component.css']
})
export class ReviewComponent implements OnInit {

  public reviews : ReviewMain[];
  public deleteReview : ReviewMain | undefined;
  public paramUserid : string;
  public hotelName : HotelMain;
  public reviewmodal : boolean = false;

/*
constructor(private reviewservice: Reviewservice, private route : ActivatedRoute ) { 
    this.reviews=[];
    this.route.params.subscribe(params => {
      this.paramHotelid = params['hotelid'];
    })
    this.reviewPageNo = 1;
  }
*/

  constructor(private reviewservice: Reviewservice, private route : ActivatedRoute) { 
    this.reviews=[];
    this.route.params.subscribe(params =>{
      this.paramUserid = params['userid'];
    })
  }
  
  clickedModalClose(){
    this.reviewmodal =false;
  }
  
  clickedreviewmodal(){
    this.reviewmodal =true;
  }


  ngOnInit(): void {
  }
  public reviewmodel : boolean=false;

  clickedModelClose(){
    this.reviewmodel=false;
  }
  clickedRegisterModel(){
    this.reviewmodel=true;
  }

  addReview(addReviewForm : NgForm) : void{
    console.log(addReviewForm.value);
    document.getElementById('closeId')?.click();
    this.reviewservice.addReview(addReviewForm.value).subscribe(
      (response : string)=>{
        console.log(response);
        addReviewForm.reset();
        alert("후기 작성 완료");
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message);
        addReviewForm.reset();
      }
    )
  }
 
  public getMyReview():void {
  this.clickedreviewmodal();
    this.reviewservice.getMyReview(localStorage.getItem('userid')).subscribe(
      (response : ReviewMain[]) =>{
      this.reviews=response["content"];
      console.log(this.reviews)
    },
  (error: HttpErrorResponse) =>{
    alert(error.message);
  }
    );
  }
  
}
