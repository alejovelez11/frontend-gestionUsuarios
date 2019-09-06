import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  logueado:boolean 
  constructor(public http:HttpClient) { }
  loginService(usuario:Login){
    let url = `${ URL_SERVICIOS }login`
    return this.http.post(url, usuario).pipe(
      map(res => {
        this.logueado = res["error"]
        return res
      })
    )
  }
  islogged() {
    let url = `${ URL_SERVICIOS }validatesesion`
    return this.http.get(url)
  }
  // islogged():boolean {
  //     return this.logueado == false ? true : false
  // }
}
