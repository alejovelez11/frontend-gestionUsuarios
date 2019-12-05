import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import Swal from 'sweetalert2' 
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  breakpoint: number
  registerArray:any[] = [{
    fullName:'',
    login:'',
    identification:'',
    email:'',
    profile:''
  }]
  @ViewChild('input', {static: false}) Input: ElementRef;
  @ViewChild('inputfile', {static: false}) inputFile: ElementRef;

  constructor(public formsService:FormsService, public usuariosService:UsuariosService, public router:Router) { }

  ngOnInit() {
    this.usuariosService.leerToken()
    if (!this.usuariosService.estaAutenticado()) {
      this.router.navigate(['/login'])
      return
    }

    this.breakpoint = (window.innerWidth <= 700) ? 1 : 5;
    if (!localStorage.getItem("registros") || JSON.parse(localStorage.getItem("registros")).length === 0) {
      localStorage.setItem("registros", JSON.stringify([{
        fullName:'',
        login:'',
        identification:'',
        email:'',
        profile:''
      }]))
    }else{
      this.registerArray = JSON.parse(localStorage.getItem("registros"))
    }
  }
  
  guardarStorageRows(){
    localStorage.setItem("registros", JSON.stringify(this.registerArray))
  }

  // Funcion para convertir archivo excel a json
  onFileSelected(event){
    let fileUpload = event.target.value
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

    if (regex.test(fileUpload.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e:any) => {
                  this.processExcel(e.target.result)
                }
                reader.readAsBinaryString(event.srcElement.files[0]);
            } else {
              reader.onload = (e:any) => {
                let data = "";
                let bytes = new Uint8Array(e.target.result);
                for (let i = 0; i < bytes.byteLength; i++) {
                    data += String.fromCharCode(bytes[i]);
                }
                this.processExcel(data);
              }
              reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
          alert("This browser does not support HTML5.");
        }
    } else {
      alert("Please upload a valid Excel file.");
    }
    
  }
  processExcel(data) {
    let workbook = XLSX.read(data, {
      type: 'binary'
    });
    
    let firstSheet = workbook.SheetNames[0];
    let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

    let registersArrayExcel = excelRows.map((el:any)=>({
      "fullName": el.Nombre,
      "login": el.Login,
      "identification": el.Cedula,
      "email": el.Correo,
      "profile": el.Perfil.toString()
    }));
    
    this.registerArray = registersArrayExcel
    localStorage.setItem("registros", JSON.stringify(registersArrayExcel)) 
  }

  register(form){
    if (!form.valid && this.inputFile.nativeElement.value == "") {
      // Validaciones
      Swal.fire({
        text: "Debes copiar los registros o adjuntar un archivo",
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      return
    } else if (JSON.parse(localStorage.getItem("formularios")).length === 0){
      Swal.fire({
        text: "Debes seleccionar al menos un formulario",
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      return
    } else {
      this.registerArray = this.registerArray.map(obj=>({
        fullName: this.limpiarCadena("fullName", obj.fullName),
        login: this.limpiarCadena("login", obj.login),
        identification: obj.identification,
        email: this.limpiarCadena("email", obj.email),
        profile: obj.profile
      }));
      localStorage.setItem("registros", JSON.stringify(this.registerArray))
      let formularios = JSON.parse(localStorage.getItem("formularios"))
      let registros = JSON.parse(localStorage.getItem("registros"))
 
      const formsAndRegisters = {
        formularios,
        registros,
        usuario_solictante: this.usuariosService.decodeToken().data
      }      
    
      // Posteo de la información
      this.formsService.insertRequestsOfUsers(JSON.stringify(formsAndRegisters)).subscribe((res:any) => {
        // muestro una alerta
        Swal.fire({
          text: res["message"],
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        // redirecciono al login
        this.router.navigate(['/inicio'])
        // Seteo el localStorage
        localStorage.setItem("formularios", JSON.stringify([]))
        localStorage.setItem("registros", JSON.stringify([{
          fullName:'',
          login:'',
          identification:'',
          email:'',
          profile:''
        }]))
        
      }, err => {        
        // Si hubo un error en lado del servidor lo muestro
        Swal.fire({
          text: "Hubo un error, no se pudo registrar",
          type: 'error',
          confirmButtonText: 'Aceptar'
        })
        // Seteo el localStorage 
        localStorage.setItem("formularios", JSON.stringify([]))
        localStorage.setItem("registros", JSON.stringify([{
          fullName:'',
          login:'',
          identification:'',
          email:'',
          profile:''
        }]))
      })
    }
  }
  limpiarCadena(propiedad, valor){
    return this.limpiarCaracteres(propiedad, valor)
  }

  limpiarCaracteres(propiedad, str){
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
    to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
    
        var ret = [];
        for( var i = 0; i < str.length ; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        if (propiedad == `fullName`) {
          return this.mayusInicial(ret.join( '' ).replace(/^\s+/, '').replace(/ {2,}/g, ' ')).trim()
        }else{
          return ret.join( '' ).toLowerCase().trim()
        }
          
  }

  mayusInicial(string){
    const re = /(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:([a-záéíóúüñ])|([A-ZÁÉÍÓÚÜÑ]))|([A-ZÁÉÍÓÚÜÑ]+)/gu;
      string = string.replace(re, (m, caracterPrevio, minuscInicial, mayuscInicial, mayuscIntermedias) => {
          const locale = ['es', 'gl', 'ca', 'pt', 'en'];
          if (mayuscIntermedias)
              return mayuscIntermedias.toLowerCase(locale)
          return caracterPrevio + (minuscInicial ? minuscInicial.toLocaleUpperCase(locale) : mayuscInicial)
      })
    return string
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 5;
  }

  addRow(){
    this.registerArray.push({
      fullName:'',
      login:'',
      identification:'',
      email:'',
      profile:''
    })
    this.guardarStorageRows()
  }

  agregarNumRows(num:Number){
    for (let index = 1; index <= num; index++){
      this.registerArray.push({
        fullName:'',
        login:'',
        identification:'',
        email:'',
        profile:''
      })
    }
    this.Input.nativeElement.value = ""
    this.guardarStorageRows()
  }

  deleteRow(i){
    this.registerArray.splice(i, 1)
    this.guardarStorageRows()
  }

  saveProfile(){
    this.saveInStorage()
  }

  saveInStorage(){
    localStorage.setItem("registros", JSON.stringify(this.registerArray))
  }
}
