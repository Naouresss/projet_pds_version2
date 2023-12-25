import { Component } from '@angular/core';
import { CurrentUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;
  currentUser!: CurrentUser;
  searchForm: FormGroup; 
  filteredData: any[] = [];// Form group to handle filter inputs


  constructor(private authService: AccountService,private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      siren: [''],
      raisonSociale: [''],
      anneeReporting: [''],
      secteurActivite: [''],
      regionSiege: [''],
      soumiseDPEF: [''],
      realisePCAET: [''],
    });
  }
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

  

  // Method to handle the filter submit
  onFilterSubmit() {
    // Perform filtering logic here based on the filter inputs
    // Update filteredData accordingly
    // ...

    // For example, let's assume filteredData is being set manually for demonstration
    this.filteredData = [
      {
        logo: 'https://www.justifit.fr/wp-content/uploads/2021/05/abbe-sublett-nxZDMUQhN4o-unsplash-1300x864.jpg',
        raisonSociale: 'Entreprise A',
        anneeReporting: '2023',
        datePublication: '2023-07-17',
      },
      {
        logo: 'https://www.justifit.fr/wp-content/uploads/2021/05/abbe-sublett-nxZDMUQhN4o-unsplash-1300x864.jpg',
        raisonSociale: 'Entreprise B',
        anneeReporting: '2022',
        datePublication: '2022-12-01',
      },
      // Add more bilan items as needed
    ];
    
  }

  // Method to handle the "Consulter" button click
  onConsulterButtonClick(item: any) {
    // Implement the action to be taken when the button is clicked
    // For example, navigate to a detailed view or open a modal
    // ...

    console.log('Consulter clicked for:', item);
  }
  consulter()
{
  this.router.navigate(['consulter']);
}}
