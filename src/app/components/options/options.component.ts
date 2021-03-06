import { Component, OnInit, ViewChild, Input, Output, EventEmitter , } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection, optionService } from '../../service/connected.service';
import { ShowComponent } from '../show/show.component';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  public isMobile = false;
  public atextSize = [10, 16, 18, 22, 24, 26, 28, 36, 48, 72, 84, 96, 100];
  public size = 36;
  public fontColorPicker; widths; fontsize; fontStyle; color; bgColor; captionBG;
  public font = "FreesiaUPC";
  public mode = "video-text"
  public CaptionedWidth = "70";
  public CaptionedLine = "2";
  public classCaptionedLine = "captioned-line-2";
  public classCaptionedWidth = "captioned-width-70";
  public captioned_default = "captioned_default";
  private temp: any[] = [];
  public options; optionVideoMode; myModal; m_options; m_optionVideoMode; choice;
  public statusStreaming; terminateViewer;
  public settingCaptionedLine; settingCaptionedWidth;
  public dropupContent = "hide"
  public twoLineActive;threeLineActive;
  public widthHundredActive;widthSevenActive;
  public videoActice;textOnlyActive;
  public FreesiaUPCActive;THNiramitASActive;AngsanaNewActive;CordiaNewActive;
  public mouseEnter;

  // Fullscreen

  public exitFullscreen; incFont2; decFont2; inputFont2; viewerMode2; full;
  public fullscreenHeight = "normal-height";
  public isFullscreen = false;


  @ViewChild('settings') settings;
  @ViewChild('myDrop') ngbDropdown;
  
  constructor(private _route: Router, private route: ActivatedRoute, private apiService: Connection, public optionService: optionService,public show:ShowComponent) { 
      
      document.addEventListener("click", () => {this.mouseUp()})
      
  }

 

  ngOnInit() {

    this.twoLineActive = "active";
    this.widthSevenActive = "active";
    this.videoActice = "active";
    this.FreesiaUPCActive = "active";
    
    
    if (/Android|iPhone/i.test(window.navigator.userAgent)) {
      this.isMobile = true;
      this.size = 16;

    }
    else {
      this.isMobile = false;
    }

    this.optionService.fontColorPicker = this.fontColorPicker;
    this.optionService.widths = this.widths;
    this.optionService.fontsize = this.fontsize;
    this.optionService.fontStyle = this.fontStyle;
    this.optionService.color = this.color;
    this.optionService.bgColor = this.bgColor;
    this.optionService.captionBG = this.captionBG;


    this.m_options = this.m_optionVideoMode = this.myModal = "hide";
    this.exitFullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = this.choice = "hide"

  }


  // Viewer section //

  toIntPlus(size, change) {
    this.optionService.size = this.size = parseInt(size) + parseInt(change)
    if (this.size > 100) {
      this.optionService.size = this.size = 100;
    }
  }
  toIntMinus(size, change) {
    this.optionService.size = this.size = parseInt(size) - parseInt(change)
    if (this.size < 10) {
      this.optionService.size = this.size = 10;
    }
  }

  setFont(fontStyle) {
    this.FreesiaUPCActive = this.THNiramitASActive = this.AngsanaNewActive = this.CordiaNewActive = "";

    if(fontStyle == "FreesiaUPC"){this.FreesiaUPCActive = "active"}
    if(fontStyle == "THNiramitAS"){this.THNiramitASActive = "active"}
    if(fontStyle == "AngsanaNew"){this.AngsanaNewActive = "active"}
    if(fontStyle == "CordiaNew"){this.CordiaNewActive = "active"}

    this.optionService.fontStyle = this.fontStyle = fontStyle;
  }

  setMode(mode) {
    this.textOnlyActive = this.videoActice = ""

    if (mode == "text-only") {
      if (this.mode != "text-only") {
        this.settingCaptionedLine = this.settingCaptionedWidth = "hide";
        this.temp[0] = this.classCaptionedWidth;
        this.temp[1] = this.classCaptionedLine;
        this.optionService.classCaptionedWidth = this.classCaptionedWidth = "captioned-text-only";
        this.optionService.classCaptionedLine = this.classCaptionedLine = "";
        this.optionService.videoTextOnly = "show-inline";
        this.optionService.video = "hide";
       
      }
      this.mode = "text-only";
      this.textOnlyActive = "active";
    }
    if (mode == "video-text") {

      if (this.mode != "video-text") {
        this.optionService.classCaptionedWidth = this.classCaptionedWidth = this.temp[0];
        this.optionService.classCaptionedLine = this.classCaptionedLine = this.temp[1];
        this.settingCaptionedLine = this.settingCaptionedWidth = "inline";
        this.optionService.videoTextOnly = "hide";
        this.optionService.video = "show-inline";
       
      }
      this.mode = "video-text"
      this.videoActice = "active";
    }
  }

  setWidth(CaptionedWidth) {
    this.widths = CaptionedWidth;
    this.widthHundredActive = this.widthSevenActive = "";

    if (CaptionedWidth == 100) {
      this.optionService.classCaptionedWidth = this.classCaptionedWidth = "captioned-width-100";
      this.widthHundredActive = "active";
    }
    else if (CaptionedWidth == 70) {
      this.optionService.classCaptionedWidth = this.classCaptionedWidth = "captioned-width-70";
       
      this.widthSevenActive = "active";
    }
  }

  setCaptionedLine(CaptionedLine) {
    this.CaptionedLine = CaptionedLine;
    this.twoLineActive = this.threeLineActive = "";
    
    if (CaptionedLine == 3) {
      this.optionService.classCaptionedLine = this.classCaptionedLine = "captioned-line-3";
      this.threeLineActive = "active";
     
    }
    else if (CaptionedLine == 2) {
      this.optionService.classCaptionedLine = this.classCaptionedLine = "captioned-line-2";
      this.twoLineActive = "active";
    }
  }

  openModal() {
    this.myModal = "show-block"
    this.dropupContent = "show-block"
  }

  closeModal() {
    this.myModal = "hide"
  }

  toggleActive() {
    if(this.optionService.optionStatus == "Inactive"){
      this.optionService.optionStatus = "Active";
      this.optionService.optionPiority = true;
    }
    else if(this.optionService.optionStatus == "Active"){
      document.removeEventListener("click",() => {})
      this.optionService.optionStatus = "Inactive";
      this.optionService.optionPiority = false;
      this.ngbDropdown.close();
    }
  }

  enter(){
    this.optionService.mouseOptionEnter = true;
  }

  leave(){
    this.optionService.mouseOptionEnter = false;

  }

  mouseUp(){
    if(this.ngbDropdown.isOpen()){
      if(!this.optionService.mouseOptionEnter) {
        this.ngbDropdown.close();
        this.optionService.optionStatus = "Inactive";
        this.optionService.optionPiority = false;
        this.show.mouseOverVideo();
        
        if (!this.optionService.mouseEnter){ 
          this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "hide-smooth2";
        }
      }
    }
  }

  toFullScreen() {
    this.show.toFullScreen();
    this.optionService.full = "hide"
    this.optionService.exitFullscreen =  "show-inline";
  }

  exitFullScreen() {
    this.show.exitFullScreen();
    this.full = "show-inline";
    this.exitFullscreen = "hide";
  }
}
