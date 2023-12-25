import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { CurrentUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { DatePipe } from '@angular/common';
import { Meeting } from '../models/Meeting';

@Component({
  selector: 'app-editmeeting',
  templateUrl: './editmeeting.component.html',
  styleUrls: ['./editmeeting.component.css'],
  providers: [DatePipe]

})
export class EditmeetingComponent implements OnInit {
  meetingForm: FormGroup;
  users: any[] = []; // Assurez-vous de définir le type correct des utilisateurs
  currentUser!: CurrentUser;
  isLoggedIn = false;

  constructor(
    private authService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    private datePipe: DatePipe
  ) {
    this.getCurrentUser();

    this.meetingForm = this.formBuilder.group({
      titre: ['', Validators.required],
      dateHeure: ['', Validators.required],
      organizer: [this.currentUser?.email, Validators.required],
      participants: [[]],
      sujet: ['', Validators.required]
      // Ajoutez plus de champs au besoin
    });
  }

  ngOnInit(): void {
    // Récupérez les données de la réunion et remplissez le formulaire
    this.getCurrentUser();
    this.isLoggedIn = this.authService.isLoggedIn();

    const meetingId = this.route.snapshot.params['id']; // En supposant que vous avez l'ID de la réunion dans les paramètres de route
    this.meetingService.getMeetingById(meetingId).subscribe(
      (meetingData: any) => {
        // Patchez les valeurs dans le formulaire
        this.meetingForm.patchValue({
          titre: meetingData.titre,
          dateHeure: this.formatDate(meetingData.dateHeure),
          organizer: meetingData.organizer.email,
          participants: meetingData.participants.map((participant: any) => participant.id),
          sujet: meetingData.sujet
          // Patchez plus de champs au besoin
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données de la réunion :', error);
      }
    );

    // Récupérez les utilisateurs pour la liste déroulante des participants
    this.meetingService.getAllUtilisateurs().subscribe(
      (usersData: any) => {
        this.users = usersData;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données des utilisateurs :', error);
      }
    );
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  updateMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingId = this.route.snapshot.params['id'];
      const updatedMeetingData: Meeting = {
        ...this.meetingForm.value,
        organizer: { id: this.currentUser.id },
        participants: this.meetingForm.value.participants.map((id: any) => ({ id: id }))
      };
  
      // Appelez votre service pour mettre à jour la réunion
      this.meetingService.updateMeeting(meetingId, updatedMeetingData).subscribe(
        (res: any) => {
          alert('Réunion mise à jour avec succès !');
          this.router.navigate(['/reunion']);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de la réunion :', error);
          alert('Réunion mise à jour avec succès !');
          this.router.navigate(['/reunion']);
        }
      );
    } else {
      alert('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }
  

  private formatDate(date: string | null): string {
    if (date) {
      // Implémentez la logique pour formater la date selon vos besoins
      return this.datePipe.transform(new Date(date), 'yyyy-MM-ddTHH:mm') ?? '';
    } else {
      return '';
    }
  }
  

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
