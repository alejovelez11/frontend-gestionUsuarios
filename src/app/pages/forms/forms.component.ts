import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre'];
  dataSource;
  constructor(private service:FormsService){
      this.service.getInfo().subscribe(res => {
        this.dataSource = res;
      })
  }

  ngOnInit() {
  }

}
