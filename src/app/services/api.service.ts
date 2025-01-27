import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateUserRequest, UpdateUserRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private defaultOptions: RequestInit = {
    credentials: 'include', // Ensures cookies are sent with requests
    // headers: {
    //   'Content-Type': 'application/json',
    //   'X-Requested-With': 'XMLHttpRequest' // Helps identify AJAX requests
    // },
    // mode: 'cors' // Explicitly enable CORS
  };

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const finalOptions: RequestInit = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers
      }
    };

    console.log('OPTIONS: ', finalOptions);

    const response = await fetch(`${this.baseUrl}${url}`, finalOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return response;
  }

  // User Management APIs
  async getUsers(): Promise<User[]> {
    const response = await this.fetchWithAuth('/admin/users');
    return response.json();
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    const response = await this.fetchWithAuth('/admin/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    return response.json();
  }

  async updateUser(id: string, user: UpdateUserRequest): Promise<User> {
    const response = await this.fetchWithAuth(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    });
    return response.json();
  }

  async deleteUser(id: string): Promise<void> {
    await this.fetchWithAuth(`/admin/users/${id}`, {
      method: 'DELETE'
    });
  }
}
