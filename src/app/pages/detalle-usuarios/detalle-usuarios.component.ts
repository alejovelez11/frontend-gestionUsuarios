import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';

@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.css']
})
export class DetalleUsuariosComponent implements OnInit {
  panelOpenState = false;

  constructor(public inicioService: InicioService) { }

  ngOnInit() {
    
  }

}
