import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRoutes } from '../config/router.config';
import { AppConfig } from '../config/app.config';
import { NotesListComponent } from './components/notes-list.component';




@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,

  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
