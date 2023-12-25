import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;
  constructor(private authService: AccountService,private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  
    // Vérifier si l'utilisateur est connecté
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  
  }
  
  logout(): void {
    
    this.authService.removeToken();
    window.location.href = '/login';

  }
  
}
