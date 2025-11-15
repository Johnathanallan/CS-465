import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css'],
})
export class TripCard implements OnInit {
  @Input('trip') trip: any;

  constructor (private router: Router) {}
  
  ngOnInit(): void {}

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  //had problem with image paths, this solves it
  imageUrl(): string {
  const img = this.trip?.image ?? '';

  // If absolute URL, return as-is
  if (/^https?:\/\//i.test(img)) return img;

  // If it already points to Express’ /images, use the backend
  if (img.startsWith('/images/') || img.startsWith('images/')) {
    const withSlash = img.startsWith('/') ? img : '/' + img;
    return 'http://localhost:3000' + withSlash;
  }

  // Otherwise treat it as a filename in Angular assets
  return 'assets/images/' + img;
}


}

