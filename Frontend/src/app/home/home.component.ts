import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelService } from '../hotel.service';
import { NgLocaleLocalization } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private hotelGetList : HotelService) { }

  ngOnInit(): void {
  }
  public Loginmodal : boolean = false;
  public Registermodal : boolean = false;
  public local : string = "";
  public keyword : string = "";
  public locations : string[] = ["서울", "부산", "제주", "강원도"];

  clickedModalClose(){
    this.Loginmodal =false;
    this.Registermodal =false;

  }

  clickedLoginModal(){
    this.Loginmodal=true;
  }

  clickedRegisterModal(){
    this.Registermodal=true;

  }
  loginUser(loginForm: NgForm):void {
    this.loginService.loginRequest(loginForm.value).subscribe(
      (response: User) => {
        console.log(response);
        loginForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
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
}
