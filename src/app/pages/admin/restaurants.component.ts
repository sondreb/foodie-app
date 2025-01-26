import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="restaurants-container">
      <h2>Restaurant Management</h2>
      <div class="restaurants-list">
        <p>Restaurant list will be displayed here</p>
      </div>
    </div>
  `
})
export class AdminRestaurantsComponent {}
