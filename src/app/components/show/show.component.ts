import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataService ,Connection} from '../../connected.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  id: number;
  data;
  title = '';
  description = '';
  start_time;
  end_time;
  connectivity;
  present;
  start_period;
  end_period;
  public am = "AM";
  public pm = "PM";
  public status: any;
  public time_status: any;
  public status_color: any;
  public isMobile;
  public margin

  constructor(private route: ActivatedRoute,public dataService: DataService,private apiService:Connection) { }
  
  ngOnInit() {
   
   
    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      
      if(window.orientation > -1)
        {
          this.isMobile = true
          this.margin = "0px"
        }
      else{
          this.isMobile = false;
          this.margin = "300px"
      }
      

      document.getElementById("liveContainer").style.display = "none";
      document.getElementById("statusStreaming").style.display = "none";
      document.getElementById("terminateViewer").style.display = "none";
      document.getElementById("optionVideoMode").style.display = "none";
      document.getElementById("options").style.display = "none";
      document.getElementById("beforeStreaming").style.display = "block";

      this.id = +params['roomid'];
      this.apiService.getData(this.id).subscribe((data: any[]) => {
        let a = JSON.stringify(data);
        let b = JSON.parse(a);
        
        this.data = b.result;
        this.title = this.data.title;
        this.connectivity = this.data.connectivity;   
        this.description = this.data.description;
       
        
        this.dataService.serviceData.forEach(element => {
          if(element.id === this.id){
            this.start_time = (element.time.start_time).slice(0, -8).split("T");
            this.end_time = (element.time.end_time).slice(0, -8).split("T");
            this.initializeClock(this.start_time, this.end_time);
            let start = this.getTimeremaining(this.start_time);
            let end = this.getTimeremaining(this.end_time);
            this.start_period = start.period;
            this.end_period = end.period;
          }          
        });
      });
    });
  }

  initializeClock( startTime, endTime) {
    this.updateClock( startTime, endTime);
    let timeInterval = setInterval(() => {
      let start = this.getTimeremaining(startTime);
      let end = this.getTimeremaining(endTime);
      if (end.total <= 0) {
        clearInterval(timeInterval);
        this.status = "จบการถ่ายทอดสดแล้ว";
        this.time_status = '';
        this.status_color = "#cccccc"
      }
      else if (start.total <= 3600000 && start.total > 0) {
        this.status = '';
        this.time_status= start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
        this.status_color = "#ecd31f"
      }
      else if (start.total <= 0) {
        this.status = 'กำลังทำการถ่ายทอดสด ';
        this.time_status = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอดสด";
        this.status_color = "#5cb85c"
      }
      else {
        this.status = '';
        this.time_status = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
        this.status_color = "orange"
      }
    }, 1000 * 60
    )
  }

  getTimeremaining(time) {
    this.present = new Date();
    let total = Date.parse(time) - Date.parse(this.present);
    let minute = Math.floor((total / 1000 / 60) % 60);
    let hour = Math.floor((total / (1000 * 60 * 60)));
    if(hour < 12){
      return {
        'total': total, 'hour': hour, 'minute': minute, 'period':this.am
      };
    }
    else{
        //hour = hour % 12;
        return {
          'total': total, 'hour': hour, 'minute': minute,'period':this.pm
        };
    }
    
  }
  updateClock( startTime, endTime) {
    let start = this.getTimeremaining(startTime);
    let end = this.getTimeremaining(endTime);
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

  w3_open() {
    document.getElementById("liveContainer").style.display = "block";
    document.getElementById("statusStreaming").style.display = "block";
    document.getElementById("terminateViewer").style.display = "block";
    document.getElementById("optionVideoMode").style.display = "block";
    document.getElementById("options").style.display = "block";
    document.getElementById("beforeStreaming").style.display = "none";
  }

  w3_close() {

    document.getElementById("liveContainer").style.display = "none";
    document.getElementById("statusStreaming").style.display = "none";
    document.getElementById("terminateViewer").style.display = "none";
    document.getElementById("optionVideoMode").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("beforeStreaming").style.display = "block";
    
  }
}
