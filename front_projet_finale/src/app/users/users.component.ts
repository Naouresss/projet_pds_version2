import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentUser, User } from '../models/User';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { interval, Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedUser!: User;
  updateSubscription!: Subscription;
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'role','status','update', 'Delete'];
  dataSource!: MatTableDataSource<User>;
  listformat!: User[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isLoggedIn = false;
  currentUser!: CurrentUser;
  users!: User[];
  selectedRow: User | null = null; // Ajout de la variable selectedRow

  constructor(
    private authService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getCurrentUser();
    this.userService.getAllUtilisateurs().subscribe(
      (res: any) => {
        this.listformat = res;
        this.dataSource = new MatTableDataSource(this.listformat);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.removeToken();
    window.location.href = '/login';
  }


  applyFilter(filterValue: string) {
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  deleteUser(id: any) {
    if (confirm("Are you sure you want to delete this user ?")) {
      this.userService.deleteUser(id).subscribe(
        res => {
          this.selectedUser = new User();
          this.loadUsers();
        }
      );
    }
  }
  
  loadUsers(){
    this.userService.getAllUtilisateurs().subscribe(
      data => {this.users=data},
      error =>{console.log('An error was occured.')},
    () => {console.log('loading users was done.')}
      );
  }
  updateUser(id: any){
    this.router.navigate(['updateuser', id]);
   
  }
}
