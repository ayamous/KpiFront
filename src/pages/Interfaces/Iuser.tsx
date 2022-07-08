export interface Iuser {
    id: string;
    createdTimestamp: number;
    username: string;
    enabled: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    attributes: {notification: string}
  }