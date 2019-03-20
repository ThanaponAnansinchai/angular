import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class Connection {
    
  getRoomData  =  'http://35.247.189.242:8080/v2/rooms';
  getRoomStatus = 'http://35.247.189.242:8080/v2/status';
 
  constructor(private  httpClient:  HttpClient,private http: Http
    ) {}

  getAllData(){
    return this.httpClient.get(`${this.getRoomData}`);
  }
  getData(id){
    return  this.httpClient.get(`${this.getRoomData}/`+id);
  }
  searchData(title){
    return this.httpClient.get(`${this.getRoomData}?task=title&search=`+title);
  }
  
}

@Injectable() 
export class optionService {
  

  isMobile = false;
  atextSize = [10, 16, 18, 22, 24, 26, 28, 36, 48, 72, 84, 96, 100];
  size = 36;
  fontColorPicker; widths; fontsize; fontStyle; color; bgColor; captionBG;
  font = "FreesiaUPC";
  mode = "video-text"
  CaptionedWidth = "70";
  CaptionedLine = "2";
  classCaptionedLine = "captioned-line-2";
  classCaptionedWidth = "captioned-width-70";
  captioned_default = "captioned_default";
  temp: any[] = [];
  optionVideoMode; myModal; m_options; m_optionVideoMode; choice;
  statusStreaming; terminateViewer; 
  video = "show-inline"; 
  videoTextOnly = "hide";
  fullscreenHeight = "normal-height";
  isFullscreen = false;
  dropupContent = "hide"
}

