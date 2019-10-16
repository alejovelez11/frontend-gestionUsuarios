import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DetalleRegistroComponent } from '../detalle-registro/detalle-registro.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  analistas:any[]
  opciones:any[]
  form:FormGroup
  constructor(public inicioService:InicioService, public rutaActiva: ActivatedRoute, public detalleRegistroComponent: DetalleRegistroComponent) { }

  ngOnInit() {
    this.cargarAnalistas()
    this.cargarEstados()
    this.form = new FormGroup({
      analista: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      observacion: new FormControl(null)
    })
  }
  cargarAnalistas(){
    this.inicioService.cargarAnalistas().subscribe((analistas:any)=>{
      this.analistas = analistas
    })
  }
  cargarEstados(){
    this.inicioService.cargarEstados().subscribe((opciones:any)=>{
      this.opciones = opciones
    })
  }
  cargarData(){

  }
  guardar(){
    const dataActualizar = {
      id: this.detalleRegistroComponent.idParam,
      analista: this.form.value.analista,
      estado: this.form.value.estado,
      observacion: this.form.value.observacion,
    }
    this.inicioService.dataActualizar(dataActualizar).subscribe((res:any) => {
      Swal.fire({
        text: res.message,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }
}
