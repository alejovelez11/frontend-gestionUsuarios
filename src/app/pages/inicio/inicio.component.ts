import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nombre Solicitante', 'Analista Asigando', 'Fecha de Solicitud', 'Fecha de Gestión', 'Estado', 'Acciones'];
  dataSource;
  formularios = [];
  login:any
  constructor(public inicioService:InicioService, public userService:UsuariosService, public router:Router) { }

  ngOnInit() {
    this.userService.leerToken()
    if (!this.userService.estaAutenticado()) {
      this.router.navigate(['/login'])
      return
    }
    this.login = this.userService.decodeToken()
    this.inicioService.getInfoXuser(this.login.data.login).subscribe(res=>{
      this.dataSource = res
    })
  }

}
