import { FormsModule } from '@angular/forms';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponent } from './project/project';


import { ProjectService } from './services/project.service';  

@NgModule({
  declarations: [
    App,
    // ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ProjectComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProjectService  
  ],
  bootstrap: [ProjectComponent]
})
export class AppModule { }
