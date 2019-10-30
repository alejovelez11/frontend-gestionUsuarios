import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public _usuarioService:UsuariosService, public router:Router){
        
  }
  canActivate() : Promise<boolean> | boolean {
    let token = this._usuarioService.userToken
    if (token) {
      let payload = JSON.parse(atob(token.split(".")[1]))
      let expirado = this.expirado(payload.exp)
      if (expirado) {
        this.router.navigate(["/login"])
        this._usuarioService.logout()
        return false
      }  
    }
    return true;
  }
  expirado(fechaExp:number){
    let ahora = new Date().getTime() / 1000
    if (fechaExp < ahora) {
      return true
    } else {
      return false
    }
  }
  
}
