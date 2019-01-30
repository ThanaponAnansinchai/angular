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
  expanded :boolean = false;
  
  constructor(private route: ActivatedRoute,public dataService: DataService,private apiService:Connection) { this.expanded = this.dataService.hide;}
  
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
          }          
        });
      });
   });

  }

}
