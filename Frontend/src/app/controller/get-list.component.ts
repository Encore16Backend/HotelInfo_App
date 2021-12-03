import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelMain } from '../model/hotel.model';
import { HotelService } from '../service/hotel.service';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-list',
  templateUrl: '../view/get-list.component.html',
  styleUrls: ['../view/get-list.component.css']
})

export class GetListComponent implements OnInit {
  public hotels : Array<HotelMain>;
  public pageNo : number;
  public item : HotelMain[];
  public local : string;
  public keyword : string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($evnet){ 
    if(
        10+document.documentElement.scrollTop
          +document.documentElement.clientHeight >= document.documentElement.scrollHeight
      ){
        this.pageNo += 1;
        // this.getHotelMains();
        this.getSearchHotelList();
      }
  }

  constructor(private hotelService : HotelService, private route : ActivatedRoute) { 
    this.hotels= [];
    this.pageNo = 1;
    this.item = [];

    this.route.params.subscribe(params =>{
      if(params['keyword1'] == undefined || params['keyword1'] == null || params['keyword1'] == '') {
        this.keyword = "";
      } else {
        this.keyword = params['keyword1']
      }
      if(params['keyword2'] == undefined || params['keyword2'] == null || params['keyword2'] == '') {
        this.local = "";
      } else {
        this.local = params['keyword2'];
      }
    })

  }

  ngOnInit(): void {
    // this.getHotelMains();
    this.getSearchHotelList();
  }

  public randomNumber(hotelid:string) {
    console.log(hotelid+" 1");
    let img = document.getElementById(hotelid);
    if (img instanceof HTMLImageElement){
      img.src = '..\\assets\\default\\default'+(Math.floor( Math.random() * 40 )+1)+'.jpg';
    }
  }

  public getHotelMains(): void {
    this.hotelService.getHotels(this.pageNo).subscribe(
      (response)=>{
        this.item = response;
        for(let i of this.item) {
          this.hotels.push(i);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getSearchHotelList(): void {
    this.hotelService.SearchHotelList(this.keyword, this.local, this.pageNo).subscribe(
      (response)=>{
        this.item = response["content"];
        for(let i of this.item) {
          this.hotels.push(i);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
