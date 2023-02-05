export interface RequestUser {
  sub: string;
  email: string;
}

export interface GeneratedJwtToken {
  accessToken: string;
}
