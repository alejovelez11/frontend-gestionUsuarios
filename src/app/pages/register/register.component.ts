import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatosExcel } from '../../interfaces/excel.interface';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  breakpoint: number;
  registerArray: any[] = [{
    fullName: '',
    login: '',
    identification: '',
    email: '',
    emailSupervisor: '',
    profile: ''
  }];
  @ViewChild('input', {static: false}) Input: ElementRef;
  @ViewChild('inputfile', {static: false}) inputFile: ElementRef;

  constructor(public formsService: FormsService, public usuariosService: UsuariosService, public router: Router) { }

  ngOnInit() {
    this.usuariosService.leerToken();
    if (!this.usuariosService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return;
    }
    // para ajustar los campos al 100% de la pantalla
    this.breakpoint = (window.innerWidth <= 700) ? 1 : 6;
    if (!localStorage.getItem('registros') || JSON.parse(localStorage.getItem('registros')).length === 0) {
      localStorage.setItem('registros', JSON.stringify([{
        fullName: '',
        login: '',
        identification: '',
        email: '',
        emailSupervisor: '',
        profile: ''
      }]));
    } else {
      this.registerArray = JSON.parse(localStorage.getItem('registros'));
    }
  }

  guardarStorageRows() {
    localStorage.setItem('registros', JSON.stringify(this.registerArray));
  }

  // Funcion para convertir archivo excel a json
  onFileSelected(event) {
    const fileUpload = event.target.value;
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

    if (regex.test(fileUpload.toLowerCase())) {
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e: any) => {
                  this.processExcel(e.target.result);
                };
                reader.readAsBinaryString(event.srcElement.files[0]);
            } else {
              reader.onload = (e: any) => {
                let data = '';
                const bytes = new Uint8Array(e.target.result);
                for (let i = 0; i < bytes.byteLength; i++) {
                    data += String.fromCharCode(bytes[i]);
                }
                this.processExcel(data);
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
          Swal.fire({
            text: 'This browser does not support HTML5',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
    } else {
      Swal.fire({
        text: 'Por favor adjunte un archivo de excel válido',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    this.inputFile.nativeElement.value = '';
    return;

  }
  processExcel(data) {
    const workbook = XLSX.read(data, {
      type: 'binary'
    });

    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

    const registersArrayExcel = excelRows.map((el: any) => ({
      fullName: el.Nombre,
      login: el.Login,
      identification: el.Cedula,
      email: el.Correo,
      emailSupervisor: el.Correo_supervisor,
      profile: el.Perfil.toString()
    }));

    this.registerArray = registersArrayExcel;
    localStorage.setItem('registros', JSON.stringify(registersArrayExcel));
  }

  register(form) {
    if (!form.valid && this.inputFile.nativeElement.value === '') {
      // Validaciones
      Swal.fire({
        text: 'Debes copiar los registros o adjuntar un archivo',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else if (JSON.parse(localStorage.getItem('formularios')).length === 0) {
      Swal.fire({
        text: 'Debes seleccionar al menos un formulario',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else {
      this.registerArray = this.registerArray.map(obj => ({
        fullName: this.limpiarCadena('fullName', obj.fullName),
        login: this.limpiarCadena('login', obj.login),
        identification: obj.identification,
        email: this.limpiarCadena('email', obj.email),
        emailSupervisor: this.limpiarCadena('emailSupervisor', obj.emailSupervisor),
        profile: obj.profile
      }));
      localStorage.setItem('registros', JSON.stringify(this.registerArray));
      const formularios = JSON.parse(localStorage.getItem('formularios'));
      const registros = JSON.parse(localStorage.getItem('registros'));

      const formsAndRegisters = {
        formularios,
        registros,
        usuario_solictante: this.usuariosService.decodeToken().data
      };
// console.log(formsAndRegisters);

      // Posteo de la información
      this.formsService.insertRequestsOfUsers(JSON.stringify(formsAndRegisters)).subscribe((res: any) => {
        // muestro una alerta
        Swal.fire({
          text: res.message,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
        // redirecciono al login
        this.router.navigate(['/inicio']);
        // Seteo el localStorage
        localStorage.setItem('formularios', JSON.stringify([]));
        localStorage.setItem('registros', JSON.stringify([{
          fullName: '',
          login: '',
          identification: '',
          email: '',
          emailSupervisor: '',
          profile: ''
        }]));

      }, err => {
        // Si hubo un error en lado del servidor lo muestro
        Swal.fire({
          text: 'Hubo un error, no se pudo registrar',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
        // Seteo el localStorage
        localStorage.setItem('formularios', JSON.stringify([]));
        localStorage.setItem('registros', JSON.stringify([{
          fullName: '',
          login: '',
          identification: '',
          email: '',
          emailSupervisor: '',
          profile: ''
        }]));
      });
    }
  }
  limpiarCadena(propiedad, valor) {
    return this.limpiarCaracteres(propiedad, valor);
  }

  limpiarCaracteres(propiedad, str) {
    const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç',
    to   = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc',
    mapping = {};

    for (let i = 0, j = from.length; i < j; i++ ) {
        mapping[ from.charAt( i ) ] = to.charAt( i );
    }

    const ret = [];
    for ( let i = 0; i < str.length ; i++ ) {
            const c = str.charAt( i );
            if ( mapping.hasOwnProperty( str.charAt( i ) ) ) {
                ret.push( mapping[ c ] );
            } else {
                ret.push( c );
            }
        }
    if (propiedad === `fullName`) {
          return this.mayusInicial(ret.join( '' ).replace(/^\s+/, '').replace(/ {2,}/g, ' ')).trim();
        } else {
          return ret.join( '' ).toLowerCase().trim();
        }

  }

  mayusInicial(string) {
    const re = /(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:([a-záéíóúüñ])|([A-ZÁÉÍÓÚÜÑ]))|([A-ZÁÉÍÓÚÜÑ]+)/gu;
    string = string.replace(re, (m, caracterPrevio, minuscInicial, mayuscInicial, mayuscIntermedias) => {
          const locale = ['es', 'gl', 'ca', 'pt', 'en'];
          if (mayuscIntermedias) {
              return mayuscIntermedias.toLowerCase(locale);
          }
          return caracterPrevio + (minuscInicial ? minuscInicial.toLocaleUpperCase(locale) : mayuscInicial);
      });
    return string;
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 6;
  }

  addRow() {
    this.registerArray.push({
      fullName: '',
      login: '',
      identification: '',
      email: '',
      emailSupervisor: '',
      profile: ''
    });
    this.guardarStorageRows();
  }

  agregarNumRows(num: number) {
    for (let index = 1; index <= num; index++) {
      this.registerArray.push({
        fullName: '',
        login: '',
        identification: '',
        email: '',
        emailSupervisor: '',
        profile: ''
      });
    }
    this.Input.nativeElement.value = '';
    this.guardarStorageRows();
  }

  deleteRow(i) {
    this.registerArray.splice(i, 1);
    this.guardarStorageRows();
  }

  saveProfile() {
    this.saveInStorage();
  }

  saveInStorage() {
    localStorage.setItem('registros', JSON.stringify(this.registerArray));
  }
}
