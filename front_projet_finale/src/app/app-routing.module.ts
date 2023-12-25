import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeClientComponent } from './home-client/home-client.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';


import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './guards/admin-guard.guard';
import { ClientGuard } from './guards/client-guard.guard';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"update_user/:id",component:EditProfileComponent},

  {
    path: '',canActivate: [AdminGuard],
    loadChildren: () => import('./home-admin/home-admin.module').then(m => m.HomeAdminModule)
  },
  {
    path: '',canActivate: [ClientGuard],
    loadChildren: () => import('./home-client/home-client.module').then(m => m.HomeClientModule)
  }
 
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
