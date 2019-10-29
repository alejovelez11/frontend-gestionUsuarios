import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationError, Event } from '@angular/router';
import Swal from 'sweetalert2' 
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser:FormGroup
  hide = true;
  logueado:boolean
  previousUrl


  constructor(public usuariosService:UsuariosService, public router:Router, private routerParam:ActivatedRoute) { }

  ngOnInit() {
    // Para verificar que esté logueado
    this.usuariosService.leerToken()
    if (this.usuariosService.estaAutenticado()) {
      this.router.navigate(['/inicio'])
    } else {
      this.router.navigate(['/login'])
    }
    this.formUser = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    })

  }

  login(){
    const usuario = new Login(
      this.formUser.value.login,
      this.formUser.value.password
    )
    this.usuariosService.loginService(usuario).then((res:any) => {
      this.router.navigate(['/inicio'])
    }).catch((err: any) => {
      Swal.fire({
        text: err.mensaje,
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      return
    })
  }

}
