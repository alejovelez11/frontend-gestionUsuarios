import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import Swal from 'sweetalert2' 
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';



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
  
  constructor(public service:FormsService, public usuariosService:UsuariosService, public router:Router) { }

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

  register(form){

    localStorage.setItem("registros", JSON.stringify(this.registerArray))
      let formularios = JSON.parse(localStorage.getItem("formularios"))
      let registros = JSON.parse(localStorage.getItem("registros"))

      const formsAndRegisters = {
        formularios,
        registros,
        usuario_solictante: this.usuariosService.decodeToken().data
      }
      
      // ===========================================================================
      // datos de los formularios la info de las personas y la persona solicitante
        console.log(formsAndRegisters);
      // ===========================================================================

      // datos del usuario solicitante o el que esta actualmente logueado
      // console.log(this.usuariosService.decodeToken().data);
    



    // if (!form.valid) {
    //   Swal.fire({
    //     text: "Los campos no pueden quedar vacios",
    //     type: 'error',
    //     confirmButtonText: 'Aceptar'
    //   })
    // } else if (JSON.parse(localStorage.getItem("formularios")).length === 0){
    //   Swal.fire({
    //     text: "Debes seleccionar al menos un formulario",
    //     type: 'error',
    //     confirmButtonText: 'Aceptar'
    //   })
    // } else {
    //   localStorage.setItem("registros", JSON.stringify(this.registerArray))
    //   let formularios = JSON.parse(localStorage.getItem("formularios"))
    //   let registros = JSON.parse(localStorage.getItem("registros"))

    //   let formsAndRegisters = {
    //     formularios,
    //     registros
    //   }
    //   this.service.insertFormsXusers(formsAndRegisters).subscribe((res:any) => {
    //     Swal.fire({
    //       text: res,
    //       type: 'success',
    //       confirmButtonText: 'Aceptar'
    //     })
    //   }, err => {
    //     Swal.fire({
    //       text: "Hubo un error, no se pudo registrar",
    //       type: 'error',
    //       confirmButtonText: 'Aceptar'
    //     })
    //     localStorage.setItem("formularios", JSON.stringify([]))
    //     localStorage.setItem("registros", JSON.stringify([{
    //       fullName:'',
    //       login:'',
    //       identification:'',
    //       email:'',
    //       profile:''
    //     }]))
    //   })
    // }
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
  }
  // Poner la primera en mayuscula de la cadena de texto
  maysFirst(string){
    const re = /(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:([a-záéíóúüñ])|([A-ZÁÉÍÓÚÜÑ]))|([A-ZÁÉÍÓÚÜÑ]+)/gu;
    string.target.value = string.target.value.replace(re, (m, caracterPrevio, minuscInicial, mayuscInicial, mayuscIntermedias) => {
          const locale = ['es', 'gl', 'ca', 'pt', 'en'];
          if (mayuscIntermedias)
              return mayuscIntermedias.toLowerCase(locale)
          return caracterPrevio + (minuscInicial ? minuscInicial.toLocaleUpperCase(locale) : mayuscInicial)
    })
    return string.target.value = this.noTildes(string.target.value)
  }
  // Quitar espacios de la cadena de texto
  removeSpaces(string){
    string.target.value = string.target.value.replace(/^\s+/, '').replace(/\s+$/, '');
    string.target.value = string.target.value.replace(/ {2,}/g, ' ')
    this.saveInStorage()
  }

  saveProfile(){
    this.saveInStorage()
  }

  lowerCase(string){
    string.target.value = string.target.value.toLowerCase()
    return string.target.value = this.noTildes(string.target.value)
  }
  // Quitar tildes de la cadena de texto
  noTildes(string){
    let acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    let original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (let i = 0; i < acentos.length; i++) {
        string = string.replace(new RegExp(acentos.charAt(i), 'g'), original.charAt(i));
    }
    return string
  }

  saveInStorage(){
    localStorage.setItem("registros", JSON.stringify(this.registerArray))
  }
}
