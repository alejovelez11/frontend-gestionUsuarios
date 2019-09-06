import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http:HttpClient) {}
  getForms(){
    let url = `${URL_SERVICIOS}forms`
    return this.http.get(url)
  }
}
