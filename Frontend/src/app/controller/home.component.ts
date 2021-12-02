import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelService } from '../service/hotel.service';
import { NgLocaleLocalization } from '@angular/common';
import { RegisterService } from '../service/register.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: '../view/home.component.html',
  styleUrls: ['../view/home.component.css']
})
export class HomeComponent implements OnInit {

public Loginmodal : boolean = false;
  public Registermodal : boolean = false;
  public local : string = "";
  public keyword : string = "";
  public locations : string[] = ["서울", "부산", "제주", "강원도"];
  public Loginstate : string;
  public mystate : string;
  constructor(private loginService: LoginService, private hotelGetList : HotelService, private registerService:RegisterService) { }

  ngOnInit(): void {

    console.log(localStorage.getItem('userid'));
      if(localStorage.getItem('userid') != null && localStorage.getItem('userid') != undefined && localStorage.getItem('userid') != ''){
        console.log("1" + this.Loginstate+localStorage.getItem('userid'));
        this.Loginstate = '로그아웃';
        this.mystate='마이페이지';
      } else {
        console.log("2" + this.Loginstate+localStorage.getItem('userid'));
        this.Loginstate = '로그인';
        this.mystate='회원가입';
      }
      console.log("3" + this.Loginstate+localStorage.getItem('userid'));
  }


  clickedModalClose(){
    this.Loginmodal =false;
    this.Registermodal =false;

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
      location.pathname="/my";
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
    location.pathname="/home";
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

}
