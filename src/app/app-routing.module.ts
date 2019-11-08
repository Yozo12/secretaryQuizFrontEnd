import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { TestComponent } from './component/test/test.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'test/:id',
    component: TestComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
