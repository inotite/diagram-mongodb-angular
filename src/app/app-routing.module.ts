import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, DiagramComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'diagram',
    component: DiagramComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
