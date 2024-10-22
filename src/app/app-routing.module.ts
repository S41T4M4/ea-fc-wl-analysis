import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrentWlComponent } from './current-wl/current-wl.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'current-wl', component : CurrentWlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
