import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { DetalleUsuariosComponent } from './pages/detalle-usuarios/detalle-usuarios.component';
import { DetalleFormulariosComponent } from './pages/detalle-formularios/detalle-formularios.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { VerificaTokenGuard } from './services/guards/verifica-token.guard';

const appRoutes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'inicio',
         component: InicioComponent,
         canActivate: [VerificaTokenGuard]
    },
    {
        path:'detalle_registro/:id',
        component: DetalleRegistroComponent, 
        canActivate: [VerificaTokenGuard],
        children: [
            {path:'detalle_usuarios', component: DetalleUsuariosComponent, canActivate: [VerificaTokenGuard], data:{titulo:'Usuarios'}},
            {path:'detalle_formularios', component: DetalleFormulariosComponent, canActivate: [VerificaTokenGuard], data:{titulo:'Formularios'}},
            {path:'gestion', component: GestionComponent, canActivate: [VerificaTokenGuard], data:{titulo:'Gestión'}},
        ]
    },

    {
        path:'**',
        component:NopagefoundComponent
    }
]

export const app_routes = RouterModule.forRoot(appRoutes, { useHash: true })