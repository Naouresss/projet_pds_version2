import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CurrentUser, User } from '../models/User';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  isLoggedIn = false;
  currentUser!: CurrentUser;
  constructor(private authService: AccountService,private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Vérifier si l'utilisateur est connecté
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser(); // Utilisez la méthode du service pour obtenir les détails de l'utilisateur
  }
  logout(): void {
    
    this.authService.removeToken();
    window.location.href = '/login';

  }
  
}
