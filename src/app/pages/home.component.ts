import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Welcome to Foodie</h1>
      <p>Your guide to amazing food experiences</p>
      <div class="featured-section">
        <h2>Featured Restaurants</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .featured-section {
      margin-top: 3rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  `]
})
export class HomeComponent {}
