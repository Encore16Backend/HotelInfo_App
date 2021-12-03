import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelService } from '../service/hotel.service';
import { NgLocaleLocalization } from '@angular/common';
import { RegisterService } from '../service/register.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Updateservice } from '../service/update.service';
import { ReviewMain } from "../model/review.model";
import { Reviewservice } from '../service/review.service';


@Component({
  selector: 'app-home',
  templateUrl: '../view/home.component.html',
  styleUrls: ['../view/home.component.css']
})
export class HomeComponent implements OnInit {

public Loginmodal : boolean = false;
  public Registermodal : boolean = false;
  public mypagemodal : boolean = false;
  public local : string = "";
  public keyword : string = "";
  public locations : string[] = ["서울", "부산", "제주", "강원도"];
  public Loginstate : string;
  public mystate : string;
  public password : string;
  public reviews : ReviewMain[];
  public paramUserid : string;
  public reviewmodal : boolean = false;
  public reviewPageNo : number;
  public maxReviewPagNo : number;
  public paramHotelid : string;

  constructor(private loginService: LoginService, private hotelGetList : HotelService, private registerService:RegisterService,
    private updateservice :Updateservice,private route : ActivatedRoute , private reviewservice:Reviewservice) {
      this.reviews=[];
      this.route.params.subscribe(params =>{
        this.paramUserid = params['userid'];
      })
      if(this.paramUserid == '' || this.paramUserid == null || this.paramUserid == undefined){
        this.paramUserid = localStorage.getItem('userid');
      }
      this.reviewPageNo = 1;
     }

    ngOnInit(): void {
    console.log(localStorage.getItem('userid'));
    if(localStorage.getItem('userid') != null && localStorage.getItem('userid') != undefined && localStorage.getItem('userid') != ''){
      console.log("1" + this.Loginstate+localStorage.getItem('userid'));
        this.Loginstate = '로그 아웃';
        this.mystate='마이 리뷰';
      } else {
        console.log("2" + this.Loginstate+localStorage.getItem('userid'));
        this.Loginstate = '로그인';
        this.mystate='회원 가입';
      }
      console.log("3" + this.Loginstate+localStorage.getItem('userid'));
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

    public getReview():void {
      console.log(this.paramHotelid, this.reviewPageNo);
      this.reviewservice.getReview(this.paramHotelid, this.reviewPageNo).subscribe(
        (response) =>{
          console.log(response['content']);
          this.reviews = response["content"];
          this.maxReviewPagNo = Number(response["totalPages"]);
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }

    public CheckUser(loginForm: NgForm) {
      console.log(loginForm.value);
      loginForm.controls["userId"].setValue(localStorage.getItem('userid'));
      console.log(loginForm.value);
      this.loginService.loginRequest(loginForm.value).subscribe(
        (response: User) => {
          alert("ㅇㅋ");
        },
        (error: HttpErrorResponse) => {
          alert("비밀번호가 맞지 않습니다.");
        }
      )

    
    }
    
    clickedModalClose(){
      this.Loginmodal =false;
    this.Registermodal =false;
    this.mypagemodal = false;
    this.reviewmodal =false;
    
  }
  
  clickedmypage(){
    this.mypagemodal = true;
  }
  
  clickedCheck(){
    console.log(localStorage.getItem('userid'));
}


  clickedLoginModal(){
    if (this.Loginstate == '로그인'){
      this.Loginmodal=true;
    } else {
      this.clickedLogout();
      this.reloadPage();
    }
  }

  clickedRegisterModal(){
    if (this.mystate == '회원가입'){
      this.Registermodal=true;
    } else {
      this.getMyReview();
    }
    
    
  }


  
  clickedLogout(){
    return localStorage.removeItem("userid");
  }

  returnLocalStorage(key : string) {
    return localStorage.getItem(key);
  }


  reloadPage() {
    // window.location.reload();
    location.pathname="/";
  }
  loginUser(loginForm: NgForm):void {
    console.log(loginForm.value);
    this.loginService.loginRequest(loginForm.value).subscribe(
      (response: User) => {
        console.log(response);
        localStorage.setItem('userid', response.userId);
        loginForm.reset();
        this.reloadPage();
      },
      (error: HttpErrorResponse) => {
        loginForm.reset();
      }
    )
  }




  public HotelList(searchForm : NgForm) : void{
    this.keyword = searchForm.value['keyword1'];
    this.local = searchForm.value['keyword2'];
    if ((this.keyword == '' || this.keyword == null || this.keyword == undefined) && (this.local != '' && this.local != null && this.local != undefined)){
      location.pathname = "/list/"+this.local;
    } else if ((this.local == '' || this.local == null || this.local == undefined) && (this.keyword != '' && this.keyword != null && this.keyword != undefined)){
      location.pathname = "/list/"+this.keyword;
    } else{
      location.pathname = "/list/"+this.keyword+"/"+this.local;
    }
  }

  registerUser(registerForm: NgForm):void {
    console.log(registerForm.value);
    this.registerService.registerRequest(registerForm.value).subscribe(
      (response: string) => {
        console.log(response);
        document.getElementById("add-register")?.click();
        registerForm.reset();
        alert("회원가입이 완료되었습니다.");

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        // registerForm.reset();
        alert("중복된 아이디입니다.");
      }
    )
  }


  updateUser(loginForm: NgForm) {
    loginForm.controls['userId'].setValue(localStorage.getItem("userid"));
    this.updateservice.updateRequest(loginForm.value).subscribe(
      (response: string) => {
        // loginForm.controls['password'].setValue(localStorage.getItem("password"));
        alert("비밀번호 변경이 완료되었습니다.");
        location.pathname="/home";
      },
      (error: HttpErrorResponse) => {
        alert("비밀번호가 맞지 않습니다.");
        alert(localStorage.getItem("userid"));
      }
    )
  }

  clickedreviewmodal(){
    this.reviewmodal = true;
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
