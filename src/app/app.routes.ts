import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages/pages.component';
import { FormsComponent } from './pages/forms/forms.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
// import { LoginGuard } from './services/guards/login.guard';



const appRoutes: Routes = [
    {
        path:'',
        component: PagesComponent,
        children: [
            {path:'formularios', component: FormsComponent},
            {path:'registros', component: RegisterComponent},
            {path:'', redirectTo:'/formularios', pathMatch:'full'},
        ]
    },
    {path:'login', component: LoginComponent},
    {path:'**', component:NopagefoundComponent}
]

export const app_routes = RouterModule.forRoot(appRoutes)