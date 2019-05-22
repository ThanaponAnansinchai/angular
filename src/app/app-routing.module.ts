import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  {
    path: ':roomid',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
