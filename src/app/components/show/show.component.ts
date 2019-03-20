import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection , optionService} from '../../service/connected.service';
import { OptionsComponent } from '../options/options.component';



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
  public start_time; Tstart; end_time; Tend; present_time; startPeriod; endPeriod;


  public status: any;
  public timeStatus: any;
  public statusColor: any;
  public isMobile = false;
  public margin; top_margin;
  public atextSize = [10, 16, 18, 22, 24, 26, 28, 36, 48, 72, 84, 96, 100];
  public size = 36;
  public fontColorPicker; widths; fontsize; fontStyle; bmode; color; bgColor; captionBG;
  public font = "FreesiaUPC";
  public mode = "video-text"
  public CaptionedWidth = "70";
  public CaptionedLine = "2";
  public captioned_line = "captioned-line-2";
  public captioned_width = "captioned-width-70";
  public captioned_default = "captioned_default";
  private temp: any[] = [];
  public videoplayer
  public classCaptionedWidth
  public classCaptionedLine

  // Show & Hide relate classes

  public liveContainer; m_liveContainer; statusStreaming; terminateViewer; beforeStreaming;
  public options; optionVideoMode; myModal; m_options; m_optionVideoMode; choice;
  public video; videoTextOnly;
  public settingCaptionedLine; settingCaptionedWidth;
  public unmuteVolume; muteVolume;

  // Fullscreen

  public exit_fullscreen; incFont2; decFont2; inputFont2; viewerMode2; full;
  public fullscreenHeight = "normal-height";
  public isFullscreen = false;


  @ViewChild('fullScreen') fullScreen;

  @ViewChild(OptionsComponent) option;



  constructor(private route: ActivatedRoute, private apiService: Connection,private optionService: optionService) { 
    
   

  }

   
  
  ngOnInit() {


    this.route.paramMap.subscribe(paramMap => {

      if (/Android|iPhone/i.test(window.navigator.userAgent)) {
        this.isMobile = true
        this.margin = "0px";
        this.top_margin = "0px";
        this.size = 16;

      }
      else {
        this.isMobile = false;
        this.margin = "300px";
        this.top_margin = "70px";
      }

      window.scrollTo(0, 0);

      this.liveContainer = this.m_liveContainer = this.options = this.m_options = this.m_optionVideoMode = this.myModal = this.terminateViewer = this.statusStreaming = "hide";
      this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = this.choice = "hide"
      this.full = "hide"
      this.beforeStreaming = "show-block"
      this.optionService.dropupContent = "hide"

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
        this.initializeClock(this.data.time.start_time, this.data.time.end_time,this.data.status);



      });



    });
  }

  

  // Detail section //

  initializeClock(startTime, endTime,roomStatus) {

    this.updateClock(startTime, endTime,roomStatus);
    
    let timeInterval = setInterval(() => {
      this.updateClock(startTime,endTime,roomStatus)
    }, 1000 * 60
    )
  }

  getTimeRemaining(time) {


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
  updateClock(startTime, endTime,roomStatus) {

    let start = this.getTimeRemaining(startTime);
    let end = this.getTimeRemaining(endTime);
    this.startPeriod = (start.period);
    this.endPeriod = (end.period);

    if (roomStatus == 6 || roomStatus == 7) {
      this.status = "การถ่ายทอดสดสิ้นสุดแล้ว";
      this.timeStatus = '';
      this.statusColor = "#cccccc"
    }
    else if (roomStatus == 3) {
      this.status = '';
      this.timeStatus = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.statusColor = "#ecd31f"
    }
    else if (roomStatus == 4 || roomStatus == 5) {
      this.status = 'กำลังทำการถ่ายทอดสด';
     //this.timeStatus = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอดสด";
      this.statusColor = "#5cb85c"
    }
    else {
      this.status = '';
      this.timeStatus = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.statusColor = "orange"
    }
  }


  // Viewer section //

  viewerStart() {

    if (this.isMobile) {

      this.m_liveContainer = this.m_options = this.m_optionVideoMode = "show-block";
    }
    if (!this.isMobile) {

       this.liveContainer = this.options = "show-block";
      this.optionVideoMode = "show-inline"

    }



    if(this.isFullscreen){
      
    }
    this.full = "show-inline"
    this.video = this.statusStreaming = this.terminateViewer = "show-block";
    this.beforeStreaming = this.videoTextOnly = "hide";

    
    this.videoplayer.play();

  }

  viewerStop() {
    if (this.isMobile) {
      this.m_liveContainer  = this.m_optionVideoMode = "hide";
    }
    else {
      this.liveContainer = this.optionVideoMode = this.options = "hide";
    }

    this.optionService.dropupContent = this.statusStreaming = this.terminateViewer = "hide";
    this.beforeStreaming = "show-block";

    this.videoplayer.pause();
    this.videoplayer.currentTime = 0;
     


  }

  toFullScreen() {

    this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "show-inline";

    this.full = "hide";
    this.optionService.fullscreenHeight = "full-height";
    this.isFullscreen = true;
    this.choice = "show-block";

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

    this.exit_fullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = "hide";
    this.full = "show-inline";
    this.optionService.fullscreenHeight = "normal-height";
    this.fullscreenHeight = "normal-height";
    this.isFullscreen = false;
    this.choice = "hide";

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
}

