import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from '../../connected.service';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public id: number;
  public data; connectivity;
  public title = '';
  public description = '';
  public start_time; Tstart; end_time; Tend; present_time; start_period; end_period;


  public status: any;
  public time_status: any;
  public status_color: any;
  public isMobile = false;
  public margin; top_margin;
  public atextSize = [10, 16, 18, 22, 24, 26, 28, 36, 48, 72, 84, 96, 100];
  public size = 36;
  public fontColorPicker; widths; fontsize; fontStyle; bmode; color; bgcolor; caption_bg;
  public font = "FreesiaUPC";
  public mode = "video-text"
  public CaptionedWidth = "70";
  public CaptionedLine = "2";
  public captioned_line = "captioned-line-2";
  public captioned_width = "captioned-width-70";
  public captioned_default = "captioned_default";
  private temp: any[] = [];
  public videoplayer

  // Show & Hide relate classes

  public liveContainer; m_liveContainer; statusStreaming; terminateViewer; beforeStreaming;
  public options; optionVideoMode; myModal; m_options; m_optionVideoMode;
  public video; videoTextOnly;
  public settingCaptionedLine; settingCaptionedWidth;
  public unmuteVolume; muteVolume;

  // Fullscreen

  public exit_fullscreen; incFont2; decFont2; inputFont2; viewerMode2; full;
  public fullscreenHeight = "normal-height";
  public isFullscreen = false;


  @ViewChild('fullScreen') fullScreen;


  constructor(private _route: Router, private route: ActivatedRoute, private apiService: Connection) { }

  ngOnInit() {


    this.route.paramMap.subscribe(paramMap => {

      if (/Android|iPhone/i.test(window.navigator.userAgent)) {
        this.isMobile = true
        this.margin = "0px"
        this.top_margin = "0px"
        this.size = 16

      }
      else {
        this.isMobile = false;
        this.margin = "300px"
        this.top_margin = "70px"
      }

      window.scrollTo(0, 0);

      this.liveContainer = this.m_liveContainer = this.options = this.m_options = this.m_optionVideoMode = this.myModal = this.terminateViewer = this.statusStreaming = "hide";
      this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "hide"
      this.full = "hide"
      this.beforeStreaming = "show-block"

      this.mode = "video-text";
      this.video = "hide";
      this.videoTextOnly = "hide";


      this.videoplayer = <HTMLVideoElement> document.getElementById("video");
      this.videoplayer.pause();
      this.videoplayer.currentTime = 0;

      this.id = +paramMap.get('roomid');
      console.log(paramMap.get('roomid'))
      this.apiService.getData(this.id).subscribe((data) => {

        this.data = data['result'];
        this.title = this.data.title;
        this.connectivity = this.data.connectivity;
        this.description = this.data.description;

        this.start_time = (this.data.time.start_time).slice(0, -8).split("T");
        this.end_time = (this.data.time.end_time).slice(0, -8).split("T");
        this.Tstart = this.start_time[1];
        this.Tend = this.end_time[1];
        this.initializeClock(this.data.time.start_time, this.data.time.end_time);



      });



    });
  }

  // Detail section //

  initializeClock(startTime, endTime) {

    let start = this.getTimeremaining(startTime);
    let end = this.getTimeremaining(endTime);
    this.start_period = start.period;
    this.end_period = end.period;

    this.updateClock(startTime, endTime);

    let timeInterval = setInterval(() => {

      this.updateClock(startTime, endTime);

    }, 1000 * 60
    )
  }

  getTimeremaining(time) {
    // console.log(time);


    this.present_time = new Date();
    let total = Date.parse(time) - Date.parse(this.present_time);
    let minute = Math.floor((total / 1000 / 60) % 60);
    let hour = Math.floor((total / (1000 * 60 * 60)));
    if (hour < 12) {
      return {
        'total': total, 'hour': hour, 'minute': minute, 'period': "AM"
      };
    }
    else {
      //hour = hour % 12;
      return {
        'total': total, 'hour': hour, 'minute': minute, 'period': "PM"
      };
    }

  }
  updateClock(startTime, endTime) {

    let start = this.getTimeremaining(startTime);
    let end = this.getTimeremaining(endTime);

    // console.log(end);

    if (end.total <= 0) {
      this.status = "การถ่ายทอดสดสิ้นสุดแล้ว";
      this.time_status = '';
      this.status_color = "#cccccc"
    }
    else if (start.total <= 3600000 && start.total > 0) {
      this.status = '';
      this.time_status = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "#ecd31f"
    }
    else if (start.total <= 0) {
      this.status = 'กำลังทำการถ่ายทอดสด';
      this.time_status = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอดสด";
      this.status_color = "#5cb85c"
    }
    else {
      this.status = '';
      this.time_status = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "orange"
    }
  }


  // Viewer section //

  viewer_start() {

    if (this.isMobile) {

      this.m_liveContainer = this.m_options = this.m_optionVideoMode = "show-block";
      this.videoTextOnly = "hide";
    }
    if (!this.isMobile) {

      this.video = this.liveContainer = this.options = "show-block";
      this.optionVideoMode = "show-inline"
    }
    this.full = "show-inline"
    this.statusStreaming = this.terminateViewer = "show-block";
    this.beforeStreaming = this.videoTextOnly = "hide";

    
    this.videoplayer.play();

  }

  viewer_stop() {
    if (this.isMobile) {
      this.m_liveContainer = this.m_options = this.m_optionVideoMode = "hide";
    }
    else {
      this.liveContainer = this.optionVideoMode = this.options = "hide";
    }

    this.statusStreaming = this.terminateViewer = "hide";
    this.beforeStreaming = "show-block";

    this.videoplayer.pause();
    this.videoplayer.currentTime = 0;

  }

  toFullScreen() {

    this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "show-inline"

    this.full = "hide"
    this.fullscreenHeight = "full-height"
    this.isFullscreen = true;


    let elem = this.fullScreen.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }
  }

  exitFullScreen() {

    this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "hide"
    this.full = "inline"
    this.fullscreenHeight = "normal-height"
    this.isFullscreen = false;


    if (document['exitFullscreen']) {
      document['exitFullscreen']();
    } else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    } else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    } else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }


  over() {
    
    if (this.isFullscreen) {
      this.full = "hide";
      this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "show-inline"
    }
    else { 
      this.full = "show-inline" 

    }
    this.optionVideoMode = this.statusStreaming = this.terminateViewer = "show-inline";
    
    setTimeout(() => {
      this.full = this.optionVideoMode = this.statusStreaming = this.terminateViewer = "hide";
      this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "hide"
    }, 5000);
  }


  toIntPlus(size, change) {
    this.size = parseInt(size) + parseInt(change)
    if (this.size > 100) {
      this.size = 100;
    }
  }
  toIntMinus(size, change) {
    this.size = parseInt(size) - parseInt(change)
    if (this.size < 10) {
      this.size = 10;
    }
  }

  setFont(fontStyle) {
    this.fontStyle = fontStyle;
  }

  setMode(mode) {
    this.bmode = mode;

    if (mode == "text-only") {

      this.settingCaptionedLine = this.settingCaptionedWidth = "none";


      this.temp[0] = this.captioned_width;
      this.temp[1] = this.captioned_line;
      this.captioned_width = "captioned-text-only";
      this.captioned_line = ""

      this.video = "hide";
      this.videoTextOnly = "inline";


    }
    if (mode == "video-text") {
      this.captioned_width = this.temp[0];
      this.captioned_line = this.temp[1];

      this.settingCaptionedLine = this.settingCaptionedWidth = "inline";



      this.video = "inline";
      this.videoTextOnly = "hide";



    }
  }

  setWidth(CaptionedWidth) {
    this.widths = CaptionedWidth;
    if (CaptionedWidth == 100) {
      this.captioned_width = "captioned-width-100"
    }
    else if (CaptionedWidth == 70) {
      this.captioned_width = "captioned-width-70"
    }

  }

  setCaptionedLine(CaptionedLine) {
    this.CaptionedLine = CaptionedLine;
    if (CaptionedLine == 3) {
      this.captioned_line = "captioned-line-3"
    }
    else if (CaptionedLine == 2) {
      this.captioned_line = "captioned-line-2"
    }

  }

  mute() {
   
    this.videoplayer.muted = true;
    this.muteVolume = "hide"
    this.unmuteVolume = "show-inline"

  }
  unMute() {
    
    this.videoplayer.muted = false;
    this.muteVolume = "show-inline"
    this.unmuteVolume = "hide"

  }

  open_modal() {
    this.myModal = "show-block"
  
  }

  close_modal() {
    this.myModal = "hide"
  }
}

