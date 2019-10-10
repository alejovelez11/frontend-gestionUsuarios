import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

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
  constructor(public inicioService:InicioService, public userService:UsuariosService) { }

  ngOnInit() {
    this.login = this.userService.decodeToken()
    this.inicioService.getInfoXuser(this.login.data.login).subscribe(res=>{
      console.log(res);
      
      this.dataSource = res
    })
  }

}
