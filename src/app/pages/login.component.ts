import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <form class="login-form" (ngSubmit)="onSubmit()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" class="login-input">
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" class="login-input">
        <button type="submit" [disabled]="isLoading">
          {{isLoading ? 'Logging in...' : 'Login'}}
        </button>
        <div class="error" *ngIf="error">{{error}}</div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .login-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: red;
      margin-top: 0.5rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      await this.authService.loginWithCredentials(this.email, this.password);
      await this.router.navigate(['/']);
    } catch (err) {
      this.error = 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
