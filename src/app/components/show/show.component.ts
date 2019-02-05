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
  private sub: any;
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
  public expanded :boolean = false;
  constructor(private route: ActivatedRoute,public dataService: DataService,private apiService:Connection) { }
  
  ngOnInit() {
   
    this.sub = this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      this.id = +params['roomid'];
      this.apiService.getData(this.id).subscribe((data: any[]) => {
        let a = JSON.stringify(data);
        let b = JSON.parse(a);
        
        this.data = b.result;
        this.title = this.data.title;
        this.connectivity = this.data.connectivity;   
        this.description = this.data.description;
        this.expanded = this.dataService.hide;
        
        this.dataService.serviceData.forEach(element => {
          if(element.id === this.id){
            this.start_time = (element.time.start_time).slice(0, -8).split("T");
            this.end_time = (element.time.end_time).slice(0, -8).split("T");
            let start = this.getTimeremaining(this.start_time);
            let end = this.getTimeremaining(this.end_time);
            this.start_period = start.period;
            this.end_period = end.period;
          }          
        });
      });
   });

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
        hour = hour % 12;
        return {
          'total': total, 'hour': hour, 'minute': minute,'period':this.pm
        };
    }
  }
}
