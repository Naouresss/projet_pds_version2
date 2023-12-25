import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, User } from '../models/User';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registerrequest } from '../services/registerrequest';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-ajoutuser',
  templateUrl: './ajoutuser.component.html',
  styleUrls: ['./ajoutuser.component.css']
})
export class AjoutuserComponent implements OnInit {
  isLoggedIn = false;
  type: string ="password";
  currentUser!: CurrentUser;
  id!: any;
  user!: User;
  registerForm!: FormGroup;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthentificationService
  ) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.createForm();
  }

  ngOnInit(): void {
 
    this.isLoggedIn = this.accountService.isLoggedIn();

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.accountService.getCurrentUser();
  }

  logout(): void {
    this.accountService.removeToken();
    window.location.href = '/login';
  }
  createForm(){
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
 
  }
  onSubmit(): void {
    const registerRequest: Registerrequest = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
  if(this.registerForm.valid){
    this.authService.register(registerRequest).subscribe(
      (response) => {
              alert('Account added successfully!! :-)\n\n');
              this.gotoList();
        }
        )
      }
      else {
        this.validateAllFormFields(this.registerForm);
        alert("your form is invalid")
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



  gotoList() {
    this.router.navigate(['user']);
  }
 


}
