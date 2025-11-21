import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../services/authentication';
import { RouterModule } from '@angular/router';

// Navbar component for navigation and authentication status display
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})

// Navbar component for navigation and authentication status display
export class NavbarComponent implements OnInit {
constructor(
private authenticationService: Authentication
) { }
ngOnInit() { }
public isLoggedIn(): boolean {
return this.authenticationService.isLoggedIn();
}
public onLogout(): void {
return this.authenticationService.logout();
}
}