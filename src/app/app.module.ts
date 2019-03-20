import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './components/room/room.component';
import { Connection , optionService} from './service/connected.service';
import { ShowComponent } from './components/show/show.component';
import { OptionsComponent } from './components/options/options.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ShowComponent,
    OptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ColorPickerModule,
    NgbModule
  ],
  providers: [Connection,optionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
