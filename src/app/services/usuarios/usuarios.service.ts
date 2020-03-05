import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  logueado: boolean;
  userToken: string;
  login: string;

  constructor(public http: HttpClient) {
    this.leerToken();
  }

  loginService(usuario: Login) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const url = `${ URL_SERVICIOS }login`;
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(usuario)).subscribe((resp: any) => {
        if (!resp.error) {
          resolve(resp);
          this.guardarToken(resp.token);
        } else {
          reject(resp);
        }
      });
    });
  }

  logout() {
    localStorage.clear();
  }

  guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('idToken', idToken);
  }

  decodeToken() {
    if (localStorage.getItem('idToken')) {
      const b64DecodeUnicode = str =>
      decodeURIComponent(
      Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));

      const parseJwt = token =>
      JSON.parse(
        b64DecodeUnicode(
          token.split('.')[1].replace('-', '+').replace('_', '/')
          )
          );
      return parseJwt(localStorage.getItem('idToken'));
    }
  }

  leerToken() {
    if (localStorage.getItem('idToken')) {
     this.userToken = localStorage.getItem('idToken');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): any {
      return ( this.userToken.length > 5 ) ? true : false;
  }
}


