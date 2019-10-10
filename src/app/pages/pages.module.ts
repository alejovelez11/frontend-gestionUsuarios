import { NgModule } from '@angular/core';
// Rutas de la app
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleRegistroComponent } from './detalle-registro/detalle-registro.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';
import { DetalleFormulariosComponent } from './detalle-formularios/detalle-formularios.component';



@NgModule({
  declarations: [
    FormsComponent,
    RegisterComponent,
    NopagefoundComponent,
    InicioComponent,
    DetalleRegistroComponent,
    DetalleUsuariosComponent,
    DetalleFormulariosComponent,
    DetalleFormulariosComponent
  ],
  exports: [
    FormsComponent,
    RegisterComponent,
    NopagefoundComponent,
  ],
  imports:[
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PAGES_ROUTES
  ]

})
export class PagesModule { }
