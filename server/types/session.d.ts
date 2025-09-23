import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      subscriptionTier: string;
      selectedSpecialties: string[];
      isVerified: boolean;
    };
  }
}