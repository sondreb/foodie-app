import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin area.</p>
    </div>
  `
})
export class AdminComponent {
}
