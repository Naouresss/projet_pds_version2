import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, User } from '../models/User';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registerequest } from '../services/registerrequest';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  isLoggedIn = false;
  currentUser!: CurrentUser;
  id: any;
  user!: User;
  registerForm!: FormGroup;

  constructor(
    private authService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  
  }

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

    /* if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }*/

    this.getCurrentUser();
  }


  getCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.removeToken();
    window.location.href = '/login';
  }

  updateUser(): void {
 

 
    const registerRequest: Registerequest = {
      nom: this.user.nom ?? '',
      prenom: this.user.prenom ?? '',
      email: this.user.email ?? '',
      password: this.user.password ?? '',
      role: this.user.role ?? ''
    };
    
    this.userService.editUser(this.id, registerRequest).subscribe(
      () => {
        console.log('id: ' + this.id);
        console.log('User updated successfully');
        alert('User updated successfully.');
        this.gotoList();
      },
      error => {
        console.log('id: ' + this.id);
        console.log('Error updating user:', error);
        alert('An error occurred while updating the profile.');
      }
    );
  }

  onSubmit(): void {
    this.updateUser();
  }

  gotoList(): void {
    this.router.navigate(['user']);
    // location.reload();
  }
}
