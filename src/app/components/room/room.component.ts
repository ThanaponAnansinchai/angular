import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService ,Connection} from '../../connected.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public present;
  public rooms: any[] = [];
  public Stime: string[][] = [];
  public Etime: string[][] = [];
  public status: any[] = [];
  public time_status: any[] = [];
  public start_period: any[]=[];
  public end_period: any[]=[];
  public searchText: string;
  public status_color: any;
  public am = "AM";
  public pm = "PM";

  constructor(private apiService: Connection, private route: Router, public dataService: DataService) {}
  
  ngOnInit() {
    
  }

  w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }

  w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }


}
