import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { ShowComponent } from './components/show/show.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
  path: 'v2/viewer',
  component: RoomComponent
  },
  {
    path: 'v2/room/:roomid',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
