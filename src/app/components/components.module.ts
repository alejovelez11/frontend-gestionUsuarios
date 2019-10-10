import { NgModule } from '@angular/core';
// Rutas de la app
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TabsComponent,
    SearchComponent,
    LoadingComponent,
  ],
  exports: [
    NavbarComponent,
    TabsComponent,
    SearchComponent,
    LoadingComponent
  ],
  imports:[
    MaterialModule,
    RouterModule
  ]

})
export class ComponentsModule { }
