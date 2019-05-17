import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection, optionService } from '../../service/connected.service';




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
  public startTime; Tstart; endTime; Tend; presentTime; startPeriod; endPeriod;
  public caption = "เป็นเวลา 20 ปีมาแล้ว ในวันที่ท้องฟ้าถูกฉีกด้วยแสงจำนวนนับไม่ถ้วนที่ตกลงมายังโลกผมคิดว่าถึงเวลาสำหรับบทเรียนประวัติศาสตร์แล้วล่ะ";

  public status: any;
  public timeStatus: any;
  public statusColor: any;
  public isMobile = false;
  public margin; topMargin;
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
  public videoplayer; videoArea
  public classCaptionedWidth
  public classCaptionedLine

  // Show & Hide relate classes

  public liveContainer; m_liveContainer; statusStreaming; terminateViewer; beforeStreaming;
  public options; optionVideoMode; myModal; m_options; m_optionVideoMode; choice;
  public video; videoTextOnly;
  public settingCaptionedLine; settingCaptionedWidth;
  public unmuteVolume; muteVolume;

  // Fullscreen

  public exitFullscreen; incFont2; decFont2; inputFont2; viewerMode2; full;
  public fullscreenHeight = "normal-height";
  public isFullscreen = false;
  public timeout = null;
  public time = 0;


  @ViewChild('fullScreen') fullScreen;






  constructor(private route: ActivatedRoute, private apiService: Connection, public optionService: optionService) {




  }



  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {

      if (/Android|iPhone/i.test(window.navigator.userAgent)) {
        this.isMobile = true
        this.margin = "0px";
        this.topMargin = "0px";
        this.size = 16;

      }
      else {
        this.isMobile = false;
        this.margin = "300px";
        this.topMargin = "70px";
      }

      window.scrollTo(0, 0);

      this.liveContainer = this.m_liveContainer = this.options = this.m_options = this.m_optionVideoMode = this.myModal = this.terminateViewer = this.statusStreaming = "hide";
      this.full = this.exitFullscreen = this.incFont2 = this.decFont2 = this.inputFont2 = this.viewerMode2 = this.choice = "hide"

      this.beforeStreaming = "show-block"
      this.optionService.dropupContent = "hide"

      this.mode = "video-text";
      this.video = "hide";
      this.videoTextOnly = "hide";


      this.videoplayer = <HTMLVideoElement>document.getElementById("video");
      this.videoplayer.pause();
      this.videoplayer.currentTime = 0;

      this.id = +paramMap.get('roomid');
      console.log(paramMap.get('roomid'))

      this.apiService.getData(this.id).subscribe((data) => {

        this.data = data
        this.title = this.data.title;
        this.connectivity = this.data.connectivity;
        this.description = this.data.description;

        this.startTime = (this.data.time.start_time).split(" ");
        this.endTime = (this.data.time.end_time).split(" ");
        this.Tstart = this.startTime[1].slice(0, -3);
        this.Tend = this.endTime[1].slice(0, -3);
        this.initializeClock(this.data.time.start_time, this.data.time.end_time, this.data.status);
      });
    });
  }



  // Detail section //

  initializeClock(startTime, endTime, roomStatus) {

    this.updateClock(startTime, endTime, roomStatus);

    setInterval(() => {
      this.updateClock(startTime, endTime, roomStatus)
    }, 1000 * 60
    )
  }

  getTimeRemaining(time) {

    this.presentTime = new Date();
    let total = Date.parse(time) - Date.parse(this.presentTime);

    let minute = Math.floor((total / 1000 / 60) % 60);
    let hour = Math.floor((total / (1000 * 60 * 60)));

    minute = Math.abs(minute)
    hour = Math.abs(hour)

    if (hour < 12) {
      return {
        'total': total, 'hour': hour, 'minute': minute
      };
    }
    else {
      // hour = hour % 12;
      return {
        'total': total, 'hour': hour, 'minute': minute
      };
    }

  }

  updateClock(startTime, endTime, roomStatus) {

    let start = this.getTimeRemaining(startTime);
    //let end = this.getTimeRemaining(endTime);

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

    this.full = "show-inline"
    this.video = this.statusStreaming = this.terminateViewer = "show-block";
    this.beforeStreaming = this.videoTextOnly = "hide";
    clearTimeout(this.timeout);
    this.videoArea = "cursor-show"
    this.videoplayer.play();

  }

  viewerStop() {
    clearTimeout(this.timeout);
    if (this.isMobile) {
      this.m_liveContainer = this.m_optionVideoMode = "hide";
    }
    else {
      this.liveContainer = this.optionVideoMode = this.options = "hide";
    }
    this.exitFullScreen();
    this.optionService.dropupContent = this.statusStreaming = this.terminateViewer = "hide";
    this.beforeStreaming = "show-block";

    this.videoplayer.pause();
    this.videoplayer.currentTime = 0;
    this.optionService.optionStatus = "Inactive";
    this.isFullscreen = false;

  }

  toFullScreen() {

    this.optionService.exitFullscreen = this.viewerMode2 = "show-inline";

    this.optionService.full = "hide";
    this.optionService.fullscreenHeight = this.fullscreenHeight = "full-height";
    this.isFullscreen = this.optionService.isFullscreen = true;
    this.choice = "show-block";
    this.time = 3000;

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
    this.time = 0;
    this.optionService.exitFullscreen = this.viewerMode2 = "hide";
    this.optionService.full = "show-inline";
    this.optionService.fullscreenHeight = this.fullscreenHeight = "normal-height";
    this.isFullscreen = this.optionService.isFullscreen = false;
    this.choice = "hide";
    this.videoArea = "cursor-show"
    clearTimeout(this.timeout);


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


  enter() {
    this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "show-smooth";
    this.optionService.mouseEnter = true;

  }

  leave() {
    this.optionService.mouseEnter = false;
    if (!this.optionService.optionPiority) {
      this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "hide-smooth";

    }
  }

  mouseOverVideo() {
    clearTimeout(this.timeout);

    if (this.isFullscreen) {
      if (this.optionService.optionPiority || this.optionService.mouseOptionEnter) {
        this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "show-smooth"
        this.videoArea = "cursor-show"
      }
      else if (!this.optionService.mouseOptionEnter) {

        this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "show-smooth";
        this.videoArea = "cursor-show"
        this.timeout = setTimeout(() => {
          this.optionService.statusStreaming = this.optionService.terminateViewer = this.optionService.options = "hide-smooth"
          this.videoArea = "cursor-hide"
        }, this.time)
      }
    }
    else {
      this.videoArea = "cursor-show"
    }
  }


}

