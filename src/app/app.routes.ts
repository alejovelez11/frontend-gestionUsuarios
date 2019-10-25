import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { DetalleUsuariosComponent } from './pages/detalle-usuarios/detalle-usuarios.component';
import { DetalleFormulariosComponent } from './pages/detalle-formularios/detalle-formularios.component';
import { GestionComponent } from './pages/gestion/gestion.component';

const appRoutes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'inicio',
         component: InicioComponent
    },
    {
        path:'detalle_registro/:id',
        component: DetalleRegistroComponent,
        children: [
            {path:'detalle_usuarios', component: DetalleUsuariosComponent, data:{titulo:'Usuarios'}},
            {path:'detalle_formularios', component: DetalleFormulariosComponent, data:{titulo:'Formularios'}},
            {path:'gestion', component: GestionComponent, data:{titulo:'Gestión'}},
        ]
    },

    {
        path:'**',
        component:NopagefoundComponent
    }
]

export const app_routes = RouterModule.forRoot(appRoutes, { useHash: true })