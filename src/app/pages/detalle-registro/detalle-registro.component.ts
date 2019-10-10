import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {
  idParam:number
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(public rutaActiva: ActivatedRoute, private router: Router, public inicioService:InicioService) {
    this.navLinks = [
      {
        label: 'FORMULARIOS',
        link: 'detalle_formularios',
        index: 0
      }, {
        label: 'USUARIOS',
        link: 'detalle_usuarios',
        index: 1
      } 
  ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.idParam = this.rutaActiva.snapshot.params.id;
    console.log(this.idParam);
    
    this.inicioService.getDetailsXuser(this.idParam).then(r=> console.log(r));
    
  
  }

}
