import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  url = "http://localhost:8080/gestionUsuarios/backend/controller/"

  constructor(private http:HttpClient) {}
  getInfo(){
    return this.http.get(`${this.url}forms.controller.php`)
  }
}
