// src/app/edit-trip/edit-trip.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'],
})
export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Couldn't find the stored tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],     // type="date" expects yyyy-MM-dd
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        const trip = Array.isArray(value) ? value[0] : value;
        if (!trip) {
          this.message = 'No Trip Retrieved!';
          return;
        }

        // Normalize ISO/Date to yyyy-MM-dd for the date input
        const normalizedStart = this.toDateInput(trip.start);
        this.trip = { ...trip, start: normalizedStart } as Trip;

        this.editForm.patchValue({
          ...trip,
          start: normalizedStart,
        });

        this.message = `Trip: ${tripCode} retrieved`;
        console.log(this.message);
      },
      error: (err: any) => console.log('Error: ' + err),
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (!this.editForm.valid) return;

    // Convert date input (yyyy-MM-dd) back to ISO string for the API
    const form = this.editForm.value;
    const isoStart = this.toIsoFromDateInput(form.start);

    const payload = {
      ...form,
      start: isoStart,
    };

    this.tripDataService.updateTrip(payload).subscribe({
      next: (val: any) => {
        console.log(val);
        this.router.navigate(['']);
      },
      error: (err: any) => console.log('Error: ' + err),
    });
  }

  // Quick access to form fields
  get f() {
    return this.editForm.controls;
  }

  /** Convert various date inputs (ISO string/Date/number) to yyyy-MM-dd for <input type="date"> */
  private toDateInput(value: unknown): string {
    if (!value) return '';
    const d = typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : (value as Date);

    if (isNaN(d.getTime())) return '';
    // Shift to local and take the date part
    const tzOffsetMs = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - tzOffsetMs);
    return local.toISOString().slice(0, 10); // yyyy-MM-dd
  }

  /** Convert yyyy-MM-dd (from date picker) to ISO string (UTC midnight) */
  private toIsoFromDateInput(value: unknown): string | null {
    if (!value || typeof value !== 'string') return null;
    // Treat picker date as local date; send UTC midnight ISO to backend
    const parts = value.split('-'); // [yyyy, MM, dd]
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map((p) => parseInt(p, 10));
    // Create a Date at local midnight then convert to ISO
    const local = new Date(y, m - 1, d, 0, 0, 0, 0);
    return new Date(Date.UTC(local.getFullYear(), local.getMonth(), local.getDate())).toISOString();
  }
}
