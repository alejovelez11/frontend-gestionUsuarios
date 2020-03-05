import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleRegistroComponent } from '../detalle-registro/detalle-registro.component';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  analistas: any[];
  opciones: any[];
  form: FormGroup;
  dataGestion: any[] = [];
  opcionEstado: string;
  perfilUsuario: number;
  desabilitarBoton: boolean;
  constructor(public inicioService: InicioService,
              public router: Router,
              public detalleRegistroComponent: DetalleRegistroComponent,
              public userService: UsuariosService) { }

  ngOnInit() {
    this.cargarAnalistas();
    this.cargarEstados();
    this.cargarDataGestion();
    this.form = new FormGroup({
      analista: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      observacion: new FormControl(null)
    });
    this.perfilUsuario = parseInt(this.userService.decodeToken().data.perfil);
    this.consultarSiestaCancelado(this.detalleRegistroComponent.idParam);
  }
  consultarSiestaCancelado(idParam: number) {
    this.inicioService.consultarSiestaCancelado(idParam).subscribe((res: boolean) => {
      this.desabilitarBoton = res;
    });
  }
  cargarAnalistas() {
    this.inicioService.cargarAnalistas().subscribe((analistas: any) => {
      this.analistas = analistas;
    });
  }
  cargarEstados() {
    this.inicioService.cargarEstados().subscribe((opciones: any) => {
      this.opciones = opciones;
    });
  }
  cargarDataGestion() {
    this.inicioService.cargarDataGestion(this.detalleRegistroComponent.idParam).subscribe((res: any) => {
      this.dataGestion = res;
      this.form.get('analista').setValue(this.dataGestion[0].analista_asignado);
      this.form.get('estado').setValue(this.dataGestion[0].estado);
      if (this.dataGestion[0].observacion === null && this.perfilUsuario !== -1) {
        this.form.get('observacion').setValue('No hay observaciones');
      } else {
        this.form.get('observacion').setValue(this.dataGestion[0].observacion);
      }
    });
  }
  estadoValue(event) {
    this.opcionEstado = event.value;
  }

  guardar() {
    const dataActualizar = {
      id: this.detalleRegistroComponent.idParam,
      analista: this.form.value.analista,
      estado: this.form.value.estado,
      observacion: this.form.value.observacion,
    };
    this.inicioService.dataActualizar(dataActualizar).subscribe((res: any) => {
      if (this.opcionEstado === 'Gestionado') {
        this.inicioService.aceptarGestion(this.detalleRegistroComponent.idParam).subscribe((res: any) => {
          Swal.fire({
            text: res.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/inicio']);
        });
      } else {
        Swal.fire({
          text: res.message,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/inicio']);
        return;
      }
    });
  }

  cancelarCreacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cancelará ésta creación de usuarios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.inicioService.cancelarCreacion(this.detalleRegistroComponent.idParam).subscribe((res: any) => {
          Swal.fire(
            'Cancelado!',
            'Se cancelaron la creación de usuarios',
            'success'
          );
          this.router.navigate(['/inicio']);
        });
      }
    });
  }
}
