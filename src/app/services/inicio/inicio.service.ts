import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  url = URL_SERVICIOS;
  formualarios: string[] = [];
  usuarios: object[];
  constructor(public http: HttpClient) { }

  getInfoXuser(login: string) {
    return this.http.post(`${this.url}inicio`, JSON.stringify({login}));
  }

  getDetailsXuser(id: number) {
    const url = `${this.url}inicio_detalle`;
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify({id})).subscribe((resp: any[]) => {
        this.formualarios = resp.map(r => r.nombre_proyecto).filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
        this.usuarios = resp;

        // para eliminar los datos duplicados que me trajo la base de datos
        this.usuarios = this.eliminarObjetosDuplicados(this.usuarios, 'login');
        resolve(resp);
      });
    });
  }
  // para eliminar los datos duplicados que me trajo la base de datos
  eliminarObjetosDuplicados(arr, prop) {
    const nuevoArray = [];
    const lookup  = {};

    for (const i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }
    return nuevoArray;
  }

  cargarAnalistas() {
    const url = `${this.url}analistas`;
    return this.http.get(url);
  }

  cargarEstados() {
    const url = `${this.url}estados`;
    return this.http.get(url);
  }

  dataActualizar(data) {
    const url = `${this.url}actualizar`;
    return this.http.put(url, JSON.stringify(data));
  }

  cargarDataGestion(id: number) {
    const url = `${this.url}cargarGestion`;
    return this.http.post(url, JSON.stringify({id}));
  }

  aceptarGestion(id: number) {
    const url = `${this.url}aceptarGestion`;
    return this.http.post(url, JSON.stringify({id}));
  }

  cancelarCreacion(id: number) {
    const url = `${this.url}cancelarGestion`;
    return this.http.post(url, JSON.stringify({id}));
  }

  consultarSiestaCancelado(idParam: number) {
    const url = `${this.url}consultarSiestaCancelado`;
    return this.http.post(url, JSON.stringify({id: idParam}));
  }
}
