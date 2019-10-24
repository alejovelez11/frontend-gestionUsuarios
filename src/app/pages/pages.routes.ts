import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../services/guards/auth.guard';

const pagesRoutes: Routes = [
    {
        path:'',
        component: PagesComponent,
        children: [
            {path:'formularios', component: FormsComponent},
            {path:'registros', component: RegisterComponent},
            {path:'', redirectTo:'/inicio', pathMatch:'full'},
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)