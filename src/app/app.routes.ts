import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { DetalleUsuariosComponent } from './pages/detalle-usuarios/detalle-usuarios.component';
import { DetalleFormulariosComponent } from './pages/detalle-formularios/detalle-formularios.component';

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
            {path:'detalle_usuarios', component: DetalleUsuariosComponent},
            {path:'detalle_formularios', component: DetalleFormulariosComponent},
        ]
    },

    {
        path:'**',
        component:NopagefoundComponent
    }
]

export const app_routes = RouterModule.forRoot(appRoutes)