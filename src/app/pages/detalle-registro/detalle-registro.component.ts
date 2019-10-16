import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { map } from "rxjs/operators";
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {
  idParam:number
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(public rutaActiva: ActivatedRoute, private router: Router, public inicioService:InicioService, public userService:UsuariosService) {
    this.navLinks = [
      {
        label: 'FORMULARIOS',
        link: 'detalle_formularios',
        index: 0
      }, {
        label: 'USUARIOS',
        link: 'detalle_usuarios',
        index: 1
      },{
        label: 'GESTIÓN',
        link: 'gestion',
        index: 2
      } 
  ];
  }

  ngOnInit() {
    this.userService.leerToken()
    if (!this.userService.estaAutenticado()) {
      this.router.navigate(['/login'])
      return
    }
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.idParam = this.rutaActiva.snapshot.params.id;    
    this.inicioService.getDetailsXuser(this.idParam);
    
  
  }

}
