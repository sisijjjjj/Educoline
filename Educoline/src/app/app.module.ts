import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import de HttpClientModule
import { AppComponent } from './app.component';
// Module de routage
import { LoginComponent } from './login/login.component';
import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
// Import de FormsModule pour le support de ngModel
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EspaceEtudiantComponent,
    EnseignantComponent,
    HomeComponent,
  
    AdminComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Ajouter HttpClientModule ici
    AppRoutingModule,
    FormsModule  // Ajouter FormsModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
