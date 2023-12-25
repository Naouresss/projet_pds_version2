import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeAdminModule } from './home-admin/home-admin.module';
import { HomeClientModule } from './home-client/home-client.module';
import { CommonModule } from '@angular/common';
import { ClientGuard } from './guards/client-guard.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InviteComponent } from './invite/invite.component';
import { AjoutinviteComponent } from './ajoutinvite/ajoutinvite.component';
import { MeetingComponent } from './meeting/meeting.component';
import { AjoutmeetingComponent } from './ajoutmeeting/ajoutmeeting.component';
import { EditmeetingComponent } from './editmeeting/editmeeting.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    InviteComponent,
    AjoutinviteComponent,
    MeetingComponent,
    AjoutmeetingComponent,
    EditmeetingComponent,
    

 
 
 
   
 
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
MatPaginatorModule ,
BrowserAnimationsModule,
MatInputModule,
HomeAdminModule,
HomeClientModule,
    
  ],
  providers: [ AdminGuard,ClientGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
