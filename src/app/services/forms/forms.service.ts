import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class FormsService {
  urlServicio = URL_SERVICIOS
  constructor(private http:HttpClient) {}
  
  getForms(){
    let url = `${this.urlServicio}forms`
    return this.http.get(url)
  }

  insertRequestsOfUsers(data){    
    return this.http.post(`${this.urlServicio}requests_users`, data)
  }
}
