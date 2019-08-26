import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  DiagramComponent,
  DashboardComponent,
  CodeEditorComponent,
  PlateComponent
} from './components';
import { MatModule } from './shared/mat.module';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { ProjectsService } from './services/projects.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WidthShiftDirective } from './directives/widthShift.directive';
import { EditorService } from './services/editor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiagramComponent,
    DashboardComponent,
    CodeEditorComponent,
    PlateComponent,
    WidthShiftDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModule,
    CovalentCodeEditorModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    ProjectsService,
    EditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
