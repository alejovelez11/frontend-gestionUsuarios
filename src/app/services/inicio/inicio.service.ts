import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  url = URL_SERVICIOS
  formualarios:string[] = []
  usuarios:object[]
  constructor(public http:HttpClient) { 
  }

  getInfoXuser(login:string){
    return this.http.post(`${this.url}inicio`, {login: login})
  }

  getDetailsXuser(id:number){
    let url = `${this.url}inicio_detalle`
    return new Promise((resolve, reject) => {
      this.http.post(url, {id: id}).subscribe((resp: any[]) => {
        this.formualarios = resp.map(r=>r.nombre_proyecto).filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);

        this.usuarios = resp
        resolve(resp)
      })
    })


  }
}
