import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre'];
  dataSource:MatTableDataSource<any>
  formularios:object[] = [];
  loading:boolean;
  form:any[]
  searchKey:string
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service:FormsService, public usuariosService:UsuariosService, public router:Router){}
  
  ngOnInit() {
    this.loading = true
    this.usuariosService.leerToken()
    if (!this.usuariosService.estaAutenticado()) {
      this.router.navigate(['/login'])
      return
    }
    this.service.getForms().subscribe((res:any) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator
    }, error => this.isLoading = false )
    if (!localStorage.getItem("formularios")) {
      localStorage.setItem("formularios",JSON.stringify([]))
      this.form = []
    } else {
      this.formularios = JSON.parse(localStorage.getItem("formularios"))
      this.form = this.formularios.map((r:any) => r.formulario)
    }
    
  }
  
  getValue(event){
    if (event.checked) {
      let objetoSeleccionado = this.dataSource.filteredData.filter(r => r.nombre_tabla_usuarios == event.source.value)
      let objetoTranformado = objetoSeleccionado.map(r=> ({id:r.id, formulario:r.nombre_tabla_usuarios}))
      this.formularios.push(objetoTranformado[0]);
      localStorage.setItem("formularios", JSON.stringify(this.formularios))
    } else {
      let toRemove = this.formularios.findIndex((form:any) => form.formulario == event.source.value)
      this.formularios.splice(toRemove, 1)
      localStorage.setItem("formularios", JSON.stringify(this.formularios))
    }
  }
  onsearchKey(){
    this.searchKey = ""
    this.applyFilter()
  }
  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }
  
}
