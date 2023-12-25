import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientGuard } from '../guards/client-guard.guard';
import { HomeClientComponent } from './home-client.component';
import { InviteComponent } from '../invite/invite.component';
import { AjoutinviteComponent } from '../ajoutinvite/ajoutinvite.component';
import { MeetingComponent } from '../meeting/meeting.component';
import { AjoutmeetingComponent } from '../ajoutmeeting/ajoutmeeting.component';
import { EditmeetingComponent } from '../editmeeting/editmeeting.component';





const routes: Routes = [
  {
    path: '',
    
    canActivate: [ClientGuard],
    children: [
      { path: 'homeclient', component: HomeClientComponent },
     
      { path: 'invite', component: InviteComponent },

      { path: 'ajoutinvite', component: AjoutinviteComponent },
      {path:'reunion', component: MeetingComponent},
      {path:'ajout-MEETING', component: AjoutmeetingComponent},
      {path:'edit-MEETING/:id', component: EditmeetingComponent},


    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeClientRoutingModule { }