export interface User {
  displayName: string;
  userName: string;
  bio?: string;
  token: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  displayName: string;
  userName: string;
  email: string;
  password: string;
  bio?: string;
}
