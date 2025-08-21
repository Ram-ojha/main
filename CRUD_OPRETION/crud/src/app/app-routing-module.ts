import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Signup } from './pages/signup/signup';

const routes: Routes = [
  {
    path:"home",
    component:Home
  },
  {
    path:"about",
    component:About
  },
  {
    path:"contact",
    component:Contact
  },
  {
    path:"signup",
    component:Signup
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
