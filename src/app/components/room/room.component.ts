import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from '../../service/connected.service'
import { fromEvent, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  
  public present_time;
  public rooms: any[] = [];
  public start_time: string[][] = [];
  public end_time: string[][] = [];
  public status: any[] = [];
  public timeStatus: any[] = [];
  public startPeriod: any[]=[];
  public endPeriod: any[]=[];
  public searchText: string;
  public statusColor: any;

  public isMobile ;
  public noConnection;
  public show;
  public sideNav = "w3-open";

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
    //this.w3_close()
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
      
      this.initializeClock(index, room.time.start_time, room.time.end_time,parseInt(room.status));

      index++;
    });
  }

 
  initializeClock(index, startTime, endTime,roomStatus) {

    this.updateClock(index, startTime, endTime,roomStatus);
    
    let timeInterval = setInterval(() => {
      this.updateClock(index,startTime,endTime,roomStatus)
    }, 1000 * 60
    )
  }
  
  getTimeRemaining(time) {

      
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
  updateClock(index, startTime, endTime,roomStatus) {

    let start = this.getTimeRemaining(startTime);
    let end = this.getTimeRemaining(endTime);
    this.startPeriod.push(start.period);
    this.endPeriod.push(end.period);

    if (roomStatus == 6 || roomStatus == 7) {
      this.status[index] = "การถ่ายทอดสดสิ้นสุดแล้ว";
      this.timeStatus[index] = '';
      this.statusColor = "#cccccc"
    }
    else if (roomStatus == 3) {
      this.status[index] = '';
      this.timeStatus[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.statusColor = "#ecd31f"
    }
    else if (roomStatus == 4 || roomStatus == 5) {
      this.status[index] = 'กำลังทำการถ่ายทอดสด';
     //this.timeStatus[index] = end.hour + " ชั่วโมง " + end.minute + " นาทีจะสิ้นสุดการถ่ายทอดสด";
      this.statusColor = "#5cb85c"
    }
    else {
      this.status[index] = '';
      this.timeStatus[index] = start.hour + " ชั่วโมง " + start.minute + " นาทีจะทำการถ่ายทอดสด";
      this.statusColor = "orange"
    }
  }

  w3_open() {
    this.show = true;
  }

  w3_close() {
    this.show = false;
    this.sideNav = "w3-close"
  }

  
}