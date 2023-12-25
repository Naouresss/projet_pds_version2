import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting, Subject } from '../models/Meeting';
import { MeetingService } from '../services/meeting.service';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrentUser, User } from '../models/User';
import { UserService } from '../services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-ajoutmeeting',
  templateUrl: './ajoutmeeting.component.html',
  styleUrls: ['./ajoutmeeting.component.css']
})
export class AjoutmeetingComponent implements OnInit {
  selectedMeeting!: Meeting;
  displayedColumns: string[] = ['sujet', 'dateHeure', 'lieu', 'organizer', 'participants', 'update', 'Delete'];
  dataSource!: MatTableDataSource<Meeting>;
  meetings!: Meeting[];
  currentUser!: CurrentUser;
  listformat!: Meeting[];
  users!: User[];
  meetingForm!: FormGroup;
  sujet: Subject[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isLoggedIn = false;

  constructor(
    private authService: AccountService,
    private meetingService: MeetingService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder // Ajouter FormBuilder ici


  ) 
  {
    this.getCurrentUser();
    console.log("current: "+this.currentUser?.email);
    this.meetingForm = this.formBuilder.group({
    sujet: ['', Validators.required],
    //sujet: this.formBuilder.array([]), // Sujets
    dateHeure: ['', Validators.required],
    titre: ['', Validators.required],
    organizer: [this.currentUser?.email, Validators.required],
    participants: [[]], // Vous devez ajuster cela en fonction de votre modèle et des utilisateurs disponibles
    // Ajouter d'autres champs en fonction de vos besoins
  });}

  ngOnInit(): void {
    this.meetings = this.route.snapshot.data['meetings'];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadMeetings();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getCurrentUser();
    this.meetingService.getAllMeetings().subscribe(
      (res: any) => {
        this.listformat = res;
        this.dataSource = new MatTableDataSource(this.listformat);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.userService.getAllUtilisateurs().subscribe(
      (res: any) => {
        this.users = res;  // Stockez la liste des utilisateurs dans le tableau
      }
    );
   
  }
  get subjectsFormArray() {
    return this.meetingForm.get('sujet') as FormArray;
  }
  addSubject(): void {
    const newSubject = this.formBuilder.group({
      id: this.sujet.length + 1,
      title: ['', Validators.required]
    });
    this.subjectsFormArray.push(newSubject);
  }

  removeSubject(index: number): void {
    this.subjectsFormArray.removeAt(index);
  }
  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  loadMeetings() {
    this.meetingService.getAllMeetings().subscribe(
      (res: any) => {
        this.listformat = res;
        this.dataSource = new MatTableDataSource(this.listformat);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  
  // Méthode pour créer une réunion
 /* createMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData: Meeting = this.meetingForm.value;
      // Envoyez les données au service backend
      this.meetingService.addMeeting(meetingData).subscribe(
        (res: any) => {
          // Traitement après la création de la réunion
          console.log('Réunion créée avec succès !');
        },
        (error: any) => {
          console.error('Erreur lors de la création de la réunion : ', error);
        }
      );
    } else {
      // Affichez un message d'erreur ou effectuez une action appropriée
      console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }*/
  /*createMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData: Meeting = {
        ...this.meetingForm.value,
        organizer: { id: this.currentUser.id } // Assurez-vous que votre modèle User a un champ 'id'
      };
      this.meetingService.addMeeting(meetingData).subscribe(
        (res: any) => {
          alert('Réunion créée avec succès !');
          
        },
        (error: any) => {
          alert('Erreur lors de la création de la réunion : ');
        }
      );
    } else {
      alert('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }*/
  /*createMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData: Meeting = {
        ...this.meetingForm.value,
        organizer: { id: this.currentUser.id },
        participants: this.meetingForm.value.participants.map((id: any) => ({ id: id }))
      };
      this.meetingService.addMeeting(meetingData).subscribe(
        (res: any) => {
          alert('Réunion créée avec succès !');
        },
        (error: any) => {
          alert('Erreur lors de la création de la réunion : ' + error.message);
        }
      );
    } else {
      alert('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }
  */
  createMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData: Meeting = {
        ...this.meetingForm.value,
        organizer: { id: this.currentUser.id },
        participants: this.meetingForm.value.participants.map((id: any) => ({ id: id }))
      };
  
      this.meetingService.addMeeting(meetingData).subscribe(
        (res: any) => {
          alert('Réunion créée avec succès !');
        },
        (error: any) => {
          console.error('Erreur lors de la création de la réunion : ', error);
          alert('Réunion créée avec succès !');
          this.router.navigate(['/reunion']);
        }
      );
    } else {
      alert('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }
  

}
