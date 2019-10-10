import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @Input("valueFilter") valueFilter
  // dataSource = new MatTableDataSource(this.valueFilter);

  constructor() { }

  ngOnInit() {
  }
  // applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
