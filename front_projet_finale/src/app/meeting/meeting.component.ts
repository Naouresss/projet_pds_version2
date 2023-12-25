import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting } from '../models/Meeting';
import { MeetingService } from '../services/meeting.service';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrentUser } from '../models/User';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  selectedMeeting!: Meeting;
  displayedColumns: string[] = ['sujet', 'dateHeure', 'titre', 'organizer', 'participants', 'update', 'Delete'];
  dataSource!: MatTableDataSource<Meeting>;
  meetings!: Meeting[];
  currentUser!: CurrentUser;
  listformat!: Meeting[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isLoggedIn = false;

  constructor(
    private authService: AccountService,
    private meetingService: MeetingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getCurrentUser();

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      // Convertir l'ID en string si nécessaire
      const organizerId = currentUser.id.toString();
    
      // Appeler le service pour récupérer les réunions de l'organisateur actuel
      this.meetingService.getMeetingsByOrganizerId(organizerId).subscribe(
        (meetings: Meeting[]) => {
          this.meetings = meetings;
          this.dataSource = new MatTableDataSource(this.meetings);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error: any) => {
          console.error('Error fetching meetings:', error);
        }
      );
    }
    
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
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

  deleteMeeting(id: any) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeeting(id).subscribe(
        res => {
          // Retirer la réunion du tableau meetings
          const index = this.meetings.findIndex(meeting => meeting.id === id);
          if (index !== -1) {
            this.meetings.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.meetings);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      );
    }
  }

  updateMeeting(id: any) {
    this.router.navigate(['edit-MEETING', id]);
  }
}
