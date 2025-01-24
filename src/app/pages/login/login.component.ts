import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <form class="login-form">
        <input type="email" placeholder="Email" class="login-input">
        <input type="password" placeholder="Password" class="login-input">
        <button type="submit">Login</button>
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
  `]
})
export class LoginComponent {}
