import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Connection {
    
  API_URL  =  '//35.247.189.242:8080/v2/rooms';
  test_url = '//api.rtt.in.th';
  test_port = ':12119'

  constructor(private  httpClient:  HttpClient) {}

  getAllData(){
    return  this.httpClient.get(`${this.API_URL}`)
}
  getData(id){
    return  this.httpClient.get(`${this.API_URL}/`+id)
}
  
  testapi(){
    return this.httpClient.get(`${this.test_url}`+this.test_port)
  }
}

@Injectable() 
export class DataService {
  serviceData :any[] = []; 
  hide: boolean = false;
}