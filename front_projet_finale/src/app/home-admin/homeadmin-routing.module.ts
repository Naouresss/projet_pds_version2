import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './home-admin.component';
import { AdminGuard } from '../guards/admin-guard.guard';
import { UsersComponent } from '../users/users.component';
import { AjoutuserComponent } from '../ajoutuser/ajoutuser.component';
import { UpdateuserComponent } from '../updateuser/updateuser.component';



const routes: Routes = [
  {
    path: '',
    
    canActivate: [AdminGuard],
    children: [
      { path: 'homeadmin', component: HomeAdminComponent },
      { path: 'user', component: UsersComponent },
      { path: 'ajout-user', component: AjoutuserComponent },
      { path: 'updateuser/:id', component: UpdateuserComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAdminRoutingModule { }