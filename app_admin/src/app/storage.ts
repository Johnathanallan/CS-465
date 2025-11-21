import { InjectionToken } from '@angular/core';

// DI token to access browser localStorage
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

export class Storage {
}
