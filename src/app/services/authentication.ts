import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginUser {
  username: string;
  id: string;
  roles: string[];
}

export class UserInfo {
  username?: string;
  id?: string;
  roles: string[] = [];

  authenticated() {
    return !!this.username;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  static UNKNOWN_USER = new UserInfo();

  authInfo$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(
    AuthenticationService.UNKNOWN_USER
  );

  constructor(private router: Router) {}

  baseUrl = environment.apiUrl;

  async challenge() {
    const response = await fetch(`${this.baseUrl}/authenticate`);

    if (response.status >= 400) {
      throw new Error('Unable to receive authentication challenge.');
    }

    const result = await response.json();
    return result;
  }

  async verify(challenge: string) {
    const response = await fetch(`${this.baseUrl}/authenticate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challenge),
    });

    if (response.status >= 400) {
      throw new Error('Unable to verify authentication challenge.');
    }

    const result = await response.json();
    return result;
  }

  async authenticated() {
    const response = await fetch(`${this.baseUrl}/authenticate/protected`);

    if (response.status == 200) {
      const result = await response.json();

      return result;
    } else {
      return null;
    }
  }

  async logout() {
    localStorage.removeItem('blockcore:hub:pubkey');
    const response = await fetch(`${this.baseUrl}/authenticate/logout`);

    // if (response.status >= 400) {
    //   throw new Error('Unable to receive authentication challenge.');
    // }

    const result = await response.json();
    console.log('LOGOUT RESULT:', result);

    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);

    return result;
  }

  async loginWithCredentials(username: string, password: string) {
    const response = await fetch(`${this.baseUrl}/authenticate/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    this.setLoggedInUser(data.data);
    return data.user;
  }

  logout2() {
    localStorage.removeItem('blockcore:hub:pubkey');
    localStorage.removeItem('blockcore:notes:nostr:prvkey');
    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
    this.router.navigateByUrl('/connect');
  }

  setLoggedInUser(user: LoginUser) {
    const userInfo = new UserInfo();
    userInfo.username = user.username;
    userInfo.id = user.id;
    userInfo.roles = user.roles;
    this.authInfo$.next(userInfo);
  }
}
