import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-mypage',
  templateUrl: '../view/mypage.component.html',
  styleUrls: ['../view/mypage.component.css']
})
export class MypageComponent implements OnInit {

  public userid : string = localStorage.getItem('userid');

  constructor(private loginService: LoginService) { 
    // this.userid = localStorage.getItem('userid');
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem('userid'));
    // this.userid = localStorage.getItem('userid');
    // console.log(localStorage.getItem('userid')+this.userid);
  }


  loginUser(loginForm: NgForm) {
    loginForm.controls['userId'].setValue(localStorage.getItem("userid"));
    this.loginService.loginRequest(loginForm.value).subscribe(
      (response: User) => {
        location.pathname="/my1";
      },
      (error: HttpErrorResponse) => {
        alert("비밀번호가 맞지 않습니다.");
      }
    )
  }

}
