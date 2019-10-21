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
  constructor(public http:HttpClient) { }

  getInfoXuser(login:string){
    return this.http.post(`${this.url}inicio`, JSON.stringify({login: login}))
  }

  getDetailsXuser(id:number){
    let url = `${this.url}inicio_detalle`
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify({id: id})).subscribe((resp: any[]) => {
        this.formualarios = resp.map(r => r.nombre_proyecto).filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual)
        this.usuarios = resp
      
        // para eliminar los datos duplicados que me trajo la base de datos
        this.usuarios = this.eliminarObjetosDuplicados(this.usuarios, "login")
        resolve(resp)
      })
    })
  }
  // para eliminar los datos duplicados que me trajo la base de datos
  eliminarObjetosDuplicados(arr, prop){
    let nuevoArray = [];
    let lookup  = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }
    return nuevoArray;
  }
  
  cargarAnalistas(){
    let url = `${this.url}analistas`
    return this.http.get(url)
  }

  cargarEstados(){
    let url = `${this.url}estados`
    return this.http.get(url)
  }

  dataActualizar(data){
    let url = `${this.url}actualizar`
    return this.http.put(url, JSON.stringify(data))
  }

  cargarDataGestion(id:number){
    let url = `${this.url}cargarGestion`
    return this.http.post(url, JSON.stringify({id: id}))
    
  }
}
