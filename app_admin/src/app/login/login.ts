import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';
// Login component for user authentication
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
  
})
// LoginComponent class definition
export class LoginComponent implements OnInit {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  // Constructor with injected services
  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) { }

  ngOnInit(): void { }

  // Handle login form submission
  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email ||
        !this.credentials.password ||
        !this.credentials.name) {

      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // basically stay on login
    } else {
      this.doLogin();
    }
  }

  // Perform login operation
  private doLogin(): void {
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // go to home / trip-list
    } else {
      const timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
