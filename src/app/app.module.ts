import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ColorPickerModule } from 'ngx-color-picker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './components/room/room.component';
import { Connection, DataService} from './connected.service';
import { ShowComponent } from './components/show/show.component';
import { FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ShowComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ColorPickerModule
  
  ],
  providers: [Connection,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
