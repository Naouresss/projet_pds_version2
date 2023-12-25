
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAdminComponent } from './home-admin.component';
import { HomeAdminRoutingModule } from './homeadmin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { AdminGuard } from '../guards/admin-guard.guard';
import { UsersComponent } from '../users/users.component';
import { AjoutuserComponent } from '../ajoutuser/ajoutuser.component';
import { UpdateuserComponent } from '../updateuser/updateuser.component';

@NgModule({
  imports: [
    CommonModule,
    HomeAdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule ,

    MatInputModule,

  ],
  providers:[AdminGuard],
  declarations: [
  HomeAdminComponent,
  UsersComponent,
  AjoutuserComponent,
  UpdateuserComponent
  ],
  bootstrap: [HomeAdminComponent]
})
export class HomeAdminModule { }