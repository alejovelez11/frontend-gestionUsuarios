import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioService } from 'src/app/services/inicio/inicio.service';

@Component({
  selector: 'app-detalle-formularios',
  templateUrl: './detalle-formularios.component.html',
  styleUrls: ['./detalle-formularios.component.css']
})
export class DetalleFormulariosComponent implements OnInit {
  idParam:number

  constructor(public rutaActiva: ActivatedRoute, public inicioService:InicioService) { 
    
  }

  ngOnInit() {
     
  }

}
