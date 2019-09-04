import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser:FormGroup
  hide = true;

  constructor(public usuariosService:UsuariosService, public router:Router) { }

  ngOnInit() {
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
    this.usuariosService.loginService(usuario).subscribe((res:any) => {
      
      if (res.error) {
        Swal.fire({
          text: 'Login o contraseña incorrecta',
          type: 'error',
          confirmButtonText: 'Aceptar'
        })
        return  
      }else{
        this.router.navigate(['/formularios'])
      }
      
    })
  }

}
