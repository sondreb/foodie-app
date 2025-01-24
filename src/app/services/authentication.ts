import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

interface LoginUser {
  username: string;
  id: string;
}

export class UserInfo {
  publicKey?: string;

  publicKeyHex?: string;

  short?: string;

  username?: string;
  id?: string;

  authenticated() {
    return !!this.username || !!this.publicKeyHex;
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

  baseUrl = 'https://foodie-app.azurewebsite.net';

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
    const response = await fetch(
      `${this.baseUrl}/authenticate/protected`
    );

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

  async login() {
    const gt = globalThis as any;

    const publicKey = await gt.nostr.getPublicKey();
    const user = this.createUser(publicKey);

    localStorage.setItem('blockcore:hub:pubkey', publicKey);

    this.authInfo$.next(user);
    return user;
  }

  async loginWithCredentials(username: string, password: string) {
    const response = await fetch(`${this.baseUrl}/authenticate/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();
      
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    this.setLoggedInUser(data.user);
    return data.user;
  }

  logout2() {
    localStorage.removeItem('blockcore:hub:pubkey');
    localStorage.removeItem('blockcore:notes:nostr:prvkey');
    this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
    this.router.navigateByUrl('/connect');
  }

  private createUser(publicKey: string) {
    const user = new UserInfo();
    user.publicKeyHex = publicKey;
    user.short = publicKey.substring(0, 10) + '...'; // TODO: Figure out a good way to minimize the public key, "5...5"?
    return user;
  }

  createDidUser(publicKey: string) {
    const user = new UserInfo();
    user.publicKeyHex = publicKey;
    // user.publicKey = this.utilities.getNostrIdentifier(publicKey);
    user.short = publicKey.substring(0, 12) + '...' + publicKey.slice(-5); // TODO: Figure out a good way to minimize the public key, "5...5"?
    return user;
  }

  async getAuthInfo() {
    let publicKey = localStorage.getItem('blockcore:hub:pubkey');

    if (publicKey) {
      try {
      } catch (err) {
        // If we cannot parse the public key, reset the storage.
        publicKey = '';
        localStorage.setItem('blockcore:hub:pubkey', '');
        return AuthenticationService.UNKNOWN_USER;
      }

      const user = this.createUser(publicKey);
      this.authInfo$.next(user);
      return user;
    } else {
      this.authInfo$.next(AuthenticationService.UNKNOWN_USER);
      return AuthenticationService.UNKNOWN_USER;
    }
  }

  setLoggedInUser(user: LoginUser) {
    const userInfo = new UserInfo();
    userInfo.username = user.username;
    userInfo.id = user.id;
    this.authInfo$.next(userInfo);

    console.log('AUTH INFO NEXT');
  }
}