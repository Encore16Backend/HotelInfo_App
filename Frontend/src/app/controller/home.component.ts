import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: '../view/home.component.html',
  styleUrls: ['../view/home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  
  public locations : string[] = ["서울", "부산", "제주", "강원도"];
}
