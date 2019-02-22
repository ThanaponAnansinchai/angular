import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';




@Injectable({
  providedIn: 'root'
})
export class Connection {
    
  API_URL  =  'http://35.247.189.242:8080/v2/rooms';
  test_url = 'http://api.rtt.in.th';
  test_port = ':12119'

  constructor(private  httpClient:  HttpClient,private http: Http
    ) {}

  getAllData(){
    return this.httpClient.get(`${this.API_URL}`)
  }
  getData(id){
    return  this.httpClient.get(`${this.API_URL}/`+id)
  }
  searchData(title){
    return this.httpClient.get(`${this.API_URL}?task=title&search=`+title)
  }
  
}

@Injectable() 
export class DataService {
  serviceData :any[] = []; 
  
  
}