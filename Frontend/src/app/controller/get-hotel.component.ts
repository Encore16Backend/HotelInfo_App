import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReviewMain } from '../model/review.model'
import { Reviewservice } from '../service/review.service';
import { ActivatedRoute } from '@angular/router';
import { RoomInfo } from '../model/room.model';
import { RoomService } from '../service/room.service';
import { HotelMain } from '../model/hotel.model';
import { HotelDetailMain } from '../model/hotelDetail.model';
import { HotelDetailService } from '../service/hotel-detail.service';

@Component({
  selector: 'app-get-hotel',
  templateUrl: '../view/get-hotel.component.html',
  styleUrls: ['../view/get-hotel.component.css']
})

export class GetHotelComponent implements OnInit {
  public reviews : ReviewMain[];
  public paramHotelid : string;
  public reviewPageNo : number;
  public maxReviewPagNo : number;
  public loginUserId : string;
  public RoomReview : boolean;
  public roomInfo : RoomInfo[];
  
  public hotelDetail : HotelDetailMain;
  public oneHotel : HotelMain;
  public hotelImage : string[];
  public hotelImageTwo : string;
  public hotelImageOne : string;
  public hotelImageThr : string;
 
  constructor(private reviewservice: Reviewservice, private hotelDetailService : HotelDetailService,private route : ActivatedRoute, private roomservice : RoomService) { 
    this.hotelDetail;
    this.reviews=[];
    this.route.params.subscribe(params => {
      this.paramHotelid = params['hotelid'];
    })
    this.reviewPageNo = 1;
  }
  
  ngOnInit(): void {
    this.loginUserId = localStorage.getItem('userid');
    this.RoomReview = true;
    this.getRoomInfo();
    this.getOneHotel(this.paramHotelid);
    this.getHotelDetail(this.paramHotelid);
  }

  public reviewmodel : boolean=false;

  public randomNumber(hotelid:string) {
    let img = document.getElementById(hotelid);
    if (img instanceof HTMLImageElement){
      img.src = '..\\assets\\default\\default'+(Math.floor( Math.random() * 40 )+1)+'.jpg';
    }
  }
  
  public clickedModelClose(){
    this.reviewmodel=false;
  }

  public clickedRegisterModel(){
    this.reviewmodel=true;
  }

  public clickPrev(){
    if(this.reviewPageNo > 1){
      this.reviewPageNo -= 1;
    }
    this.getReview();
  }

  public clickNext(){
    if (this.reviewPageNo < this.maxReviewPagNo){
      this.reviewPageNo += 1;
    }
    this.getReview();
  }

  public ViewRoomReview(flag : string){
    if(flag == 'room'){
      this.RoomReview = true;
      this.getRoomInfo();
    } else{
      this.RoomReview = false;
      this.getReview();
    }
  }
  
  public addReview(addReviewForm : NgForm) : void{
    if(localStorage.getItem('userid')){
      addReviewForm.controls['userid'].setValue(localStorage.getItem('userid'));
      addReviewForm.controls['hotelid'].setValue(this.paramHotelid);
      addReviewForm.controls['hotelName'].setValue(this.oneHotel.hotelname);
      document.getElementById('closeId')?.click();
      if(confirm("리뷰 등록을 완료하시겠습니까?")){
        this.reviewservice.addReview(addReviewForm.value).subscribe(
          (_response : string)=>{
            addReviewForm.reset();
            this.getReview();
          },
          (_error : HttpErrorResponse)=>{
            addReviewForm.reset();
            alert("등록 실패");
          }
        )
      } else {
        addReviewForm.reset();
        alert("등록 취소되었습니다.");
      }
    } else{
      location.pathname="/";
    }
  }

  public deleteReview(seq : bigint, userid : string) : void {
    if(confirm("리뷰를 삭제하시겠습니까?")){
      this.reviewservice.deleteReview(seq, userid).subscribe(
        (_response)=>{
          this.getReview();
        },(_error:HttpErrorResponse)=>{
          alert("삭제 실패");
        }
      );
    } else {
      alert("삭제를 취소하였습니다.");
    }
  }

  public getReview():void {
    this.reviewservice.getReview(this.paramHotelid, this.reviewPageNo).subscribe(
      (response) =>{
        this.reviews = response["content"];
        this.maxReviewPagNo = Number(response["totalPages"]);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getRoomInfo():void{
    this.roomservice.getRoomInfo(this.paramHotelid).subscribe(
      (response) =>{
        this.roomInfo = response;
      }, (_error:HttpErrorResponse)=>{
        alert("불러오기 실패");
      }
    );
  }

  public getHotelDetail(hotelid:string):void {
    this.hotelDetailService.getHotelDetail(hotelid).subscribe(
      (response : HotelDetailMain) =>{
      this.hotelDetail=response;
      this.hotelImage=response["hotelimages"].split(",");
      this.hotelImageOne = this.hotelImage[0];
      this.hotelImageTwo = this.hotelImage[1];
      this.hotelImageThr = this.hotelImage[2];
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getOneHotel(hotelid:string):void{
    this.hotelDetailService.getOneHotel(hotelid).subscribe(
      (response : HotelMain) =>{
      this.oneHotel=response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}

