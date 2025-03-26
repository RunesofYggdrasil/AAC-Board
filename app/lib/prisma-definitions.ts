import { z } from "zod";
import bcrypt from "bcrypt";

// ---
// Section: Interfaces
// ---

export interface User {
  id?: number | undefined;
  username: string;
  password: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Session {
  id: string;
  user?: User | undefined;
  userID: number;
  expiresAt: Date;
}

// ---
// Section: User-Defined Type Guards
// ---

export function isUser(data: any): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "username" in data &&
    "password" in data &&
    !("expiresAt" in data)
  );
}

export function isSession(data: any): data is Session {
  return (
    typeof data === "object" &&
    data !== null &&
    "expiresAt" in data &&
    !("password" in data || "username" in data)
  );
}

// ---
// Section: Schemas
// ---

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  password: z.string().transform(async (value) => {
    const hashedPassword = await bcrypt.hash(value, 10);
    return hashedPassword;
  }),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SessionSchema = z.object({
  id: z.string(),
  user: UserSchema.optional(),
  userID: z.number(),
  expiresAt: z.date(),
});
