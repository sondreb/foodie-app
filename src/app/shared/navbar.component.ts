import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService, UserInfo } from '../services/authentication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/home">
          <img
            src="/icons/icon-128x128.png"
            alt="Foodie Logo"
            class="nav-logo"
          />
        </a>
      </div>
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input" />
      </div>
      <div class="nav-links">
        <a routerLink="/places" routerLinkActive="active">Places</a>
        @if (!isAuthenticated) {
        <a routerLink="/login" routerLinkActive="active">Login</a>
        } @if (isAuthenticated) {
        <a routerLink="/logout">Logout</a>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      // ...existing code...
    `,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSub?: Subscription;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    console.log('NAVBAR!!!');
    this.authSub = this.authService.authInfo$.subscribe((user: UserInfo) => {
      console.log('User:', user);
      this.isAuthenticated = user.authenticated();
    });

    console.log('AUTH SUBSCRIBED');
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
