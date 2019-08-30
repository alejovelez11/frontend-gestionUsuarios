import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas de la app
import { app_routes } from "./app.routes";

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsService } from './services/forms/forms.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchComponent } from './components/search/search.component';
import { FormsComponent } from './pages/forms/forms.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TabsComponent,
    SearchComponent,
    FormsComponent,
    RegisterComponent,
    PagesComponent,
    LoginComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    app_routes
    
  ],
  providers: [
    FormsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
