import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public usuario: UsuariosService, private router: Router) { }
  name: any;
  ngOnInit() {
    this.name = this.usuario.decodeToken();
  }
  salir() {
    this.usuario.logout();
    this.router.navigate(['/login']);
  }

}
