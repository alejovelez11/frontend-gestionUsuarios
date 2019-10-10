import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(private router: Router){
    this.navLinks = [
      {
        label: 'FORMULARIOS',
        link: '/formularios',
        index: 0
      }, {
        label: 'REGISTROS',
        link: '/registros',
        index: 1
      } 
  ];
  }

  ngOnInit():void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}


