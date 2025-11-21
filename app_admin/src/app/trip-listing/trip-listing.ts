import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import {Router} from '@angular/router';
import { Authentication } from '../services/authentication';



// Trip Listing component to show all trips

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripData],
})

// TripListing class definition
export class TripListing implements OnInit {
  trips!: Trip[];
  message: string = '';
  
  constructor(private tripData: TripData, private router: Router, private authenticationService: Authentication) {

  console.log('trip-listing constructor');
  } 

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
  
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  
// Fetch the list of trips from the service
  private getStuff(): void {
    this.tripData.getTrips()
        .subscribe({
          next: (value: any) => {
            this.trips = value;
            if(value.length > 0)
            {
            this.message = 'There are ' + value.length + ' trips available.';
            }
            else{
            this.message = 'There were no trips retrieved from the database';
            }
            console.log(this.message);
            },
            error: (error: any) => {
              console.log('Error: ' + error);
            }
        });
    }

    // OnInit lifecycle hook to fetch trips when component initializes
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
    }
    


}

