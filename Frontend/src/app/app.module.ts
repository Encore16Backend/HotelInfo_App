import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterService } from './service/register.service';
import { HotelService } from './service/hotel.service';

import { AppComponent } from './app.component';
import { GetListComponent } from './controller/get-list.component';
import { GetHotelComponent } from './controller/get-hotel.component';
import { HomeComponent } from './controller/home.component';
import { HaederComponent } from './controller/haeder.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list/:keyword1/:keyword2', component: GetListComponent},
  {path: 'list/:keyword1', component: GetListComponent},
  {path: 'list', component: GetListComponent},
  {path: 'get/:hotelid', component : GetHotelComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    GetListComponent,
    GetHotelComponent,
    HomeComponent,
    HaederComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HotelService,  RegisterService],

  bootstrap: [AppComponent]
})
export class AppModule { }
