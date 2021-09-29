import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { AuthComponent } from './auth/auth.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  {path: 'covid-stats', component: StatsComponent},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: AuthComponent},
  {path: 'post', component: PostComponent},
  {path: 'add-post', component: PostFormComponent},
  {path: '', redirectTo: 'covid-stats', pathMatch: 'full'},
  {path: '**', redirectTo: 'covid-stats', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
