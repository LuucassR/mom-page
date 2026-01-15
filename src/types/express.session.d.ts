import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: string;
  }
}

declare module 'express-session' {
  interface SessionData {
    carData?: any;
  }
}