import { Component } from '@angular/core';
import { FormsService } from './services/forms/forms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'nombre', 'desarrollador', 'descripcion'];
  dataSource;
  constructor(private service:FormsService){
      this.service.getInfo().subscribe(r=>{
        this.dataSource = r;
        console.log(this.dataSource);  
      })
  }
}

// import { Component } from '@angular/core';
// import { FormsService } from './services/forms/forms.service';
// import { MatPaginator,MatTableDataSource } from "@angular/material";

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'crud-angular';
//   constructor(private service:FormsService){
//     this.service.getInfo().subscribe(r=>{
//       console.log(r);
//     })
//   }
// }
