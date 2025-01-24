import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div class="logout-container">
      <p>Logging out...</p>
    </div>
  `,
  styles: [`
    .logout-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class LogoutComponent implements OnInit {

  router = inject(Router);
  authService = inject(AuthenticationService);

  constructor() {}

  async ngOnInit() {
    await this.authService.logout();

    // Here you would typically clear user session, tokens, etc
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
