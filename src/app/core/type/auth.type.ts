export interface User {
  id: string;
  email?: string;
  phone?: string;
  user_metadata: {
    displayName?: string;
  };
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}
