import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin/users.component';
import { AdminRestaurantsComponent } from './admin/restaurants.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminUsersComponent, AdminRestaurantsComponent],
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      
      <div class="tabs">
        <div class="tab-buttons">
          <button 
            [class.active]="activeTab === 'users'"
            (click)="activeTab = 'users'">
            Users
          </button>
          <button 
            [class.active]="activeTab === 'restaurants'"
            (click)="activeTab = 'restaurants'">
            Restaurants
          </button>
        </div>

        <div class="tab-content">
          @if (activeTab === 'users') {
            <app-admin-users />
          }
          @if (activeTab === 'restaurants') {
            <app-admin-restaurants />
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 20px;
    }

    .tabs {
      margin-top: 20px;
    }

    .tab-buttons {
      margin-bottom: 20px;
    }

    .tab-buttons button {
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      background: #f0f0f0;
      cursor: pointer;
    }

    .tab-buttons button.active {
      background: #007bff;
      color: white;
    }

    .tab-content {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AdminComponent {
  activeTab = 'users';
}
