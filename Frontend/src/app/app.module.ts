import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './join/register.service';
import { AppComponent } from './app.component';
import { GetListComponent } from './get-list/get-list.component';
import { GetHotelComponent } from './get-hotel/get-hotel.component';
import { HomeComponent } from './home/home.component';
import { HotelService } from './hotel.service';

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
