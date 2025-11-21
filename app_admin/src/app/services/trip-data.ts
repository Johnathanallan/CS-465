import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

// Service to handle trip data operations
//Will use HttpClient to interact with backend API

@Injectable({
  providedIn: 'root',
})

// TripData class definition
export class TripData {

  // Inject HttpClient for making HTTP requests
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';
  url = `${this.baseUrl}/trips`;

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // Add a new trip using POST request
  addTrip(fordata: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, fordata);
  
 }

 // Get a specific trip by its code using GET request
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(this.url + '/' + tripCode);

  }

  // Update an existing trip using PUT request
  updateTrip(formData: Trip): Observable<Trip> {
     return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
      email: user.email,
      password: passwd
    });
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, {
      name: user.name,
      email: user.email,
      password: passwd
    });
  }

}
