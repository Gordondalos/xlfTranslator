import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenFileComponent } from './open-file/open-file.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'open',
    component: OpenFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
