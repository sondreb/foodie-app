export interface User {
  id: string;
  username: string;
  roles: string[];
  email?: string;
  created: Date;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email?: string;
  roles?: string[];
}

export interface UpdateUserRequest {
  id: string;
  email?: string;
  roles?: string[];
  password?: string;
}
