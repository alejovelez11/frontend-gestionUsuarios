import { Component, OnInit, ViewChild } from '@angular/core';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nombre Solicitante', 'Analista Asigando', 'Fecha de Solicitud', 'Fecha de Gestión', 'Estado', 'Acciones'];
  dataSource:MatTableDataSource<any>
  formularios = [];
  login:any
  searchKey:string
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public inicioService:InicioService, public userService:UsuariosService, public router:Router) { }

  ngOnInit() {
    this.userService.leerToken()
    if (!this.userService.estaAutenticado()) {
      this.router.navigate(['/login'])
      return
    }
    this.login = this.userService.decodeToken()    
    this.inicioService.getInfoXuser(this.login.data.login).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  onsearchKey(){
    this.searchKey = ""
    this.applyFilter()
  }
  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

}
