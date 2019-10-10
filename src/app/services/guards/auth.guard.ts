import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuario:UsuariosService, private router:Router){

  }
  canActivate():boolean{
    if (this.usuario.estaAutenticado()) {
      return true
    }else{
      this.router.navigateByUrl("/login")
      return false
    } 
  }
}
