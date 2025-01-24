import { Component } from '@angular/core';

@Component({
  selector: 'app-places',
  standalone: true,
  template: `
    <div class="places-container">
      <h1>Popular Places</h1>
      <p>Discover great restaurants near you!</p>
    </div>
  `,
  styles: [`
    .places-container {
      padding: 2rem;
    }
    h1 {
      margin-bottom: 1rem;
    }
  `]
})
export class PlacesComponent {}
