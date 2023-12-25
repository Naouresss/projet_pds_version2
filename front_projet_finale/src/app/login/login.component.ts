import { Component, OnInit } from '@angular/core';
import { CurrentUser, LoginUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginUser = {} as LoginUser;
  isLoggedIn = false;
  buttonText: string = "Login";
  type: string ="password";
  isText: boolean = false;
  currentUser!: CurrentUser;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;
  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
  constructor(private formBuilder: FormBuilder,private accountService: AccountService,private router: Router) { 
    this.retrieveTokenFromCookie();
    this.registerForm = this.formBuilder.group({
    
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buttonText = "Login";
    this.isLoggedIn = this.accountService.isLoggedIn();

    // Si l'utilisateur est déjà connecté, redirigez-le vers la page d'accueil
    if (this.isLoggedIn) {
      if (this.accountService.isAdmin()) {
        this.router.navigate(['/homeadmin']);
      } else if (this.accountService.isChef()) {
        this.router.navigate(['/homeclient']);
      }
    }
  }

  getCurrentUser() {
    this.currentUser = this.accountService.getCurrentUser(); // Utilisez la méthode du service pour obtenir les détails de l'utilisateur
  }
  logout(): void {
    
    this.accountService.removeToken();
    window.location.href = '/login';

  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type="password";
  }
  addUser() {
    this.buttonText = "Loading...";

    if (this.registerForm.valid) {
      this.accountService.login(this.form).subscribe(
        (data) => {
          this.accountService.registerToken(data);

          alert("Login is a success !");
          console.log(this.accountService.getCurrentUser());

          // Redirigez l'utilisateur en fonction du rôle
          if (this.accountService.getCurrentUser().role === 'ROLE_ADMIN') {
            this.router.navigate(['/homeadmin']);
          } else {
            this.router.navigate(['/homeclient']);
          }
        },
        (e) => {
          console.log(e);
          alert("Login failed. Please try again.");
        }
      );
    } else {
      this.validateAllFormFields(this.registerForm);
      alert("Your form is invalid. Please check the fields.");
    }
  }
  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true})
      }else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
  private sessionTokenName = "Token";
  retrieveTokenFromCookie() {
    const tokenFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (tokenFromCookie) {
      sessionStorage.setItem(this.sessionTokenName, tokenFromCookie);
    }
  }
  
}
