import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './register/register.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path:'',
        component: PagesComponent,
        canActivate: [VerificaTokenGuard],
        children: [
            {path:'formularios', component: FormsComponent, canActivate: [VerificaTokenGuard]},
            {path:'registros', component: RegisterComponent, canActivate: [VerificaTokenGuard]},
            {path:'', redirectTo:'/inicio', pathMatch:'full'},
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true })
