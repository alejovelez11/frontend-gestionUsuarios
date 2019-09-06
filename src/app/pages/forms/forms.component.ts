import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre'];
  dataSource;
  constructor(private service:FormsService, private serviceUser:UsuariosService){
  }
  
  ngOnInit() {
    this.service.getForms().subscribe(res => {
      this.dataSource = res;
      // console.log(res);
    })
    this.serviceUser.islogged().subscribe(res => {
      console.log(res);
    })
  }

}
