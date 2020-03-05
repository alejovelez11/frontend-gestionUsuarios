import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterService {
  data: any;
  constructor() { }
  dataForms(data){
    this.data = data;  
  }
}
