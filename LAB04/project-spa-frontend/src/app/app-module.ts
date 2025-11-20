import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Project } from './project/project';

import { ProjectService } from './services/project.service';  

@NgModule({
  declarations: [
    App,
    Project
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProjectService  
  ],
  bootstrap: [Project]
})
export class AppModule { }
