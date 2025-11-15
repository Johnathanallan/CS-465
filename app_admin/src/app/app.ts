import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, TripListing],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('Travlr Getaways Admin');
}
