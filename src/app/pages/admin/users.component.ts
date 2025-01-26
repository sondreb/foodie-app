import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <h2>User Management</h2>

      <!-- Add User Form -->
      <div class="add-user-form">
        <h3>Add New User</h3>
        <form (submit)="createUser()">
          <input
            [(ngModel)]="newUser.username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            [(ngModel)]="newUser.password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            [(ngModel)]="newUser.email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <!-- Users List -->
      <div class="users-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users; trackBy: trackByUserId">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.roles.join(', ') }}</td>
              <td>
                <button (click)="editUser(user)">Edit</button>
                <button (click)="deleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Edit User Modal -->
      <div *ngIf="editingUser" class="modal">
        <div class="modal-content">
          <h3>Edit User</h3>
          <form (submit)="updateUser()">
            <input
              [(ngModel)]="editingUser.email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              [(ngModel)]="editingUser.roles"
              name="roles"
              placeholder="Roles (comma-separated)"
            />
            <button type="submit">Save</button>
            <button type="button" (click)="editingUser = null">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .users-container {
        padding: 20px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }

      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 4px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
      }

      input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      button {
        padding: 8px 16px;
        margin: 0 5px;
        cursor: pointer;
      }
    `,
  ],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  editingUser: UpdateUserRequest | null = null;
  newUser: CreateUserRequest = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.api.getUsers();
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }

  async createUser() {
    try {
      await this.api.createUser(this.newUser);
      this.newUser = { username: '', password: '', email: '' };
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }

  editUser(user: User) {
    this.editingUser = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  async updateUser() {
    if (!this.editingUser) return;

    try {
      await this.api.updateUser(this.editingUser.id!, this.editingUser);
      this.editingUser = null;
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }

  async deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await this.api.deleteUser(id);
      await this.loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }

  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
