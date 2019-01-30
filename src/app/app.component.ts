import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Connection, DataService } from './connected.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public present;
  public rooms: any[] = [];
  public Stime: string[][] = [];
  public Etime: string[][] = [];
  public status: any[] = [];
  public time_status: any[] = [];
  public searchText: string;
  public status_color: any;

  constructor(private apiService: Connection, private route: Router, public dataService: DataService) {}
  
  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    let a: string;
    let b: any;
    this.apiService.getAllData().subscribe((data: any[]) => {
      a = JSON.stringify(data);
      b = JSON.parse(a);
      let index = 0;
      this.dataService.serviceData = this.rooms = b.result;
      this.rooms.forEach(room => {
        this.Stime.push((room.time.start_time).slice(0, -8).split("T"));
        this.Etime.push((room.time.end_time).slice(0, -8).split("T"));
        this.initializeClock(index, room.time.start_time, room.time.end_time);
        index++;
      });
    });
  }
  
  getData(id) {
    this.route.navigate(['v2/room/' + id]);
  }

  initializeClock(index, startTime, endTime) {
    this.updateClock(index, startTime, endTime);
    let timeInterval = setInterval(() => {
      let start = this.getTimeremaining(startTime);
      let end = this.getTimeremaining(endTime);
      if (end.total <= 0) {
        clearInterval(timeInterval);
        this.status[index] = "จบการถ่ายทอดสดแล้ว";
        this.time_status[index] = '';
        this.status_color = "#cccccc"
      }
      else if (start.total <= 3600000 && start.total > 0) {
        this.status[index] = '';
        this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
        this.status_color = "#ecd31f"
      }
      else if (start.total <= 0) {
        this.status[index] = 'Live ';
        this.time_status[index] = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอกสด";
        this.status_color = "#5cb85c"
      }
      else {
        this.status[index] = '';
        this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
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
    return {
      'total': total, 'hour': hour, 'minute': minute
    };
  }
  updateClock(index, startTime, endTime) {
    let start = this.getTimeremaining(startTime);
    let end = this.getTimeremaining(endTime);
    if (end.total <= 0) {
      this.status[index] = "จบการถ่ายทอดสดแล้ว";
      this.time_status[index] = '';
      this.status_color = "#cccccc"
    }
    else if (start.total <= 3600000 && start.total > 0) {
      this.status[index] = '';
      this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "#ecd31f"
    }
    else if (start.total <= 0) {
      this.status[index] = 'กำลังถ่ายทอดสด';
      this.time_status[index] = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอกสด";
      this.status_color = "#5cb85c"
    }
    else {
      this.status[index] = '';
      this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "orange"
    }
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

}
