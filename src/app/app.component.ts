import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from './connected.service';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl:  './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  public present_time;
  public rooms: any[] = [];
  public start_time: string[][] = [];
  public end_time: string[][] = [];
  public status: any[] = [];
  public time_status: any[] = [];
  public start_period: any[]=[];
  public end_period: any[]=[];
  public searchText: string;
  public status_color: any;

  public isMobile ;
  public noConnection;
  public show;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];


  constructor(private apiService: Connection, private route: Router) {}
  
  ngOnInit() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.getAllData();
      this.noConnection = false;
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.rooms = [];
      this.noConnection = true;
    }));

    if(/Android|iPhone/i.test(window.navigator.userAgent)){
      this.isMobile = true;   
    }
    else{   
      this.isMobile = false;
    }
   this.getAllData();
    
  }

  getAllData() { 
    this.apiService.getAllData().subscribe((data) => {  
      this.roomData(data['result'])
    },
    (error) => {
      this.noConnection = true;
    })
  }
  
  getData(id) {
    this.w3_close()
    this.route.navigate(['v2/room/' + id]);
  }

  onKeyUp(event: any) {
    this.apiService.searchData(event.target.value).subscribe((data) =>{
     
      this.roomData(data['result'])
    },
    (error) =>{
      this.rooms = null;
    });
   
};

  roomData(result){
    this.rooms = result
    let index = 0;

    
    this.rooms.forEach(room => {
      this.start_time.push((room.time.start_time).slice(0, -8).split("T"));
      this.end_time.push((room.time.end_time).slice(0, -8).split("T"));

      this.initializeClock(index, room.time.start_time, room.time.end_time);

      index++;
    });
  }

 
  initializeClock(index, startTime, endTime) {

    this.updateClock(index, startTime, endTime);
    
    let timeInterval = setInterval(() => {
      this.updateClock(index,startTime,endTime)
    }, 1000 * 60
    )
  }
  
  getTimeremaining(time) {

      
    this.present_time = new Date();
    let total = Date.parse(time) - Date.parse(this.present_time);
    let minute = Math.floor((total / 1000 / 60) % 60);
    let hour = Math.floor((total / (1000 * 60 * 60)));
    if(hour < 12){
      return {
        'total': total, 'hour': hour, 'minute': minute, 'period':"AM"
      };
    }
    else{
        //hour = hour % 12;
        return {
          'total': total, 'hour': hour, 'minute': minute,'period':"PM"
        };
    }
    
  }
  updateClock(index, startTime, endTime) {

    let start = this.getTimeremaining(startTime);
    let end = this.getTimeremaining(endTime);
    this.start_period.push(start.period);
    this.end_period.push(end.period);

    if (end.total <= 0) {
      this.status[index] = "การถ่ายทอดสดสิ้นสุดแล้ว";
      this.time_status[index] = '';
      this.status_color = "#cccccc"
    }
    else if (start.total <= 3600000 && start.total > 0) {
      this.status[index] = '';
      this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "#ecd31f"
    }
    else if (start.total <= 0) {
      this.status[index] = 'กำลังทำการถ่ายทอดสด';
     //this.time_status[index] = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอดสด";
      this.status_color = "#5cb85c"
    }
    else {
      this.status[index] = '';
      this.time_status[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.status_color = "orange"
    }
  }

  w3_open() {
    this.show = true;
  }

  w3_close() {
    this.show = false;
  }

  
}
