import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre'];
  dataSource;
  formularios = [];
  loading:boolean
  
  constructor(private service:FormsService, public usuariosService:UsuariosService, public router:Router){}
  
  ngOnInit() {
    this.loading = true
    this.usuariosService.leerToken()
    if (!this.usuariosService.estaAutenticado()) {
      this.router.navigate(['/login'])
    }
    this.service.getForms().subscribe((res:any) => {
      this.dataSource = res;
      this.loading = false
      }
    )
    if (!localStorage.getItem("formularios")) {
      localStorage.setItem("formularios",JSON.stringify([]))
    } else {
      this.formularios = JSON.parse(localStorage.getItem("formularios"))
    }
  }

  getValue(event){
    if (event.checked) {
      this.formularios.push(event.source.value);
      localStorage.setItem("formularios", JSON.stringify(this.formularios))
    } else {
      let toRemove = this.formularios.findIndex(form => form === event.source.value)
      this.formularios.splice(toRemove, 1)
      localStorage.setItem("formularios", JSON.stringify(this.formularios))
    }
  }
  applyFilter(filterValue: string) {
    // this.infoArray.filter = filterValue.trim().toLowerCase();
  }
  // private sub: any; ngOnInit() { this.sub = this.route.params.subscribe(params => { let id = +params['id']; // (+) converts string 'id' to a number this.service.getHero(id).then(hero => this.hero = hero); }); } ngOnDestroy() { this.sub.unsubscribe(); } 
  
}
