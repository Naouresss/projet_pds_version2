import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isLoggedIn = false;
  currentUser!: CurrentUser;
  id: any;
  isAdmin = false;
  user: User | undefined;

  constructor(
    private authService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userService.findUser(this.id).subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );

    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin=this.authService.isAdmin();

   /* if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }*/

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.removeToken();
    window.location.href = '/login';
  }

  updateProfile() {
    this.userService.editProfile(this.id, this.currentUser).subscribe(
        () => {
            console.log('User updated successfully');
            alert('User updated successfully.');
            // Actualiser automatiquement la page
            this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/profile']);
            });
        },
        error => {
            console.log('Error updating user:', error);
            alert("An error occurred while updating the profile.");
        }
    );
}

  onSubmit() {
    this.updateProfile();
  }

  gotoList() {
    this.router.navigate(['profile']);
  }
}
