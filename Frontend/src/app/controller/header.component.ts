import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../service/register.service';
import { ActivatedRoute } from '@angular/router';
import { Updateservice } from '../service/update.service';
import { ReviewMain } from "../model/review.model";
import { Reviewservice } from '../service/review.service';

@Component({
  selector: 'app-header',
  templateUrl: '../view/header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  public Loginmodal : boolean = false;
  public Registermodal : boolean = false;
  public mypagemodal : boolean = false;
  public local : string = "";
  public keyword : string = "";
  public Loginstate : string;
  public mystate : string;
  public password : string;
  public reviews : ReviewMain[];
  public paramUserid : string;
  public reviewmodal : boolean = false;
  public reviewPageNo : number;
  public maxReviewPagNo : number;
  public paramHotelid : string

  constructor(private loginService: LoginService, private registerService:RegisterService,
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
    if(localStorage.getItem('userid') != null && localStorage.getItem('userid') != undefined && localStorage.getItem('userid') != ''){
        this.Loginstate = '로그 아웃';
        this.mystate='마이 리뷰';
    } else {
        this.Loginstate = '로그인';
        this.mystate='회원 가입';
    }
  }

  public clickPrev(){
    if(this.reviewPageNo > 1){
      this.reviewPageNo -= 1;
    }
    this.getMyReview();
  }

  public clickNext(){
    if (this.reviewPageNo < this.maxReviewPagNo){
      this.reviewPageNo += 1;
    }
    this.getMyReview();
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
    if (this.mystate == '회원 가입'){
      this.Registermodal=true;
    } else {
      this.getMyReview();
    }
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

  clickedLogout(){
    return localStorage.removeItem("userid");
  }

  returnLocalStorage(key : string) {
    return localStorage.getItem(key);
  }

  loginUser(loginForm: NgForm):void {
    this.loginService.loginRequest(loginForm.value).subscribe(
      (response: User) => {
        localStorage.setItem('userid', response.userId);
        loginForm.reset();
        this.reloadPage();
      },
      (_error: HttpErrorResponse) => {
        loginForm.reset();
      }
    )
  }

  reloadPage() {
    location.pathname="/";
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
    this.registerService.registerRequest(registerForm.value).subscribe(
      (_response: string) => {
        document.getElementById("add-register")?.click();
        registerForm.reset();
        alert("회원가입이 완료되었습니다.");

      },
      (error: HttpErrorResponse) => {
        alert("중복된 아이디입니다.");
      }
    )
  }

  updateUser(loginForm: NgForm) {
    loginForm.controls['userId'].setValue(localStorage.getItem("userid"));
    this.updateservice.updateRequest(loginForm.value).subscribe(
      (_response: string) => {
        // loginForm.controls['password'].setValue(localStorage.getItem("password"));
        alert("비밀번호 변경이 완료되었습니다.");
        location.pathname="/home";
      },
      (_error: HttpErrorResponse) => {
        alert("비밀번호가 맞지 않습니다.");
        alert(localStorage.getItem("userid"));
      }
    )
  }

  public getMyReview():void {
    this.clickedreviewmodal();
    this.reviewservice.getMyReview(localStorage.getItem('userid'), this.reviewPageNo).subscribe(
      (response : ReviewMain[]) =>{
        this.reviews=response["content"];
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  clickedreviewmodal(){
    this.reviewmodal = true;
  }








}
