import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/User';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {
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
