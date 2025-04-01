import { z } from "zod";
import bcrypt from "bcrypt";
import { ContrastMode, LanguageDirection, StyleFormat } from "@prisma/client";

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

export interface Profile {
  id?: number | undefined;
  name: string;
  default: boolean;
  user?: User | undefined;
  userID: number;
  settings?: Settings | undefined;
  settingsID: number;
}

export interface Settings {
  id?: number | undefined;
  contrast: ContrastMode;
}

export interface Template {
  id?: number | undefined;
}

export interface Board {
  id?: number | undefined;
}

export interface Folder {
  id?: number | undefined;
  name: string;
  style?: Style | undefined;
  styleID: number;
  board?: Board | undefined;
  boardID?: number;
  parent?: Folder | undefined;
  parentID?: number | undefined;
}

export interface Button {
  id?: number | undefined;
  name: string;
  style?: Style | undefined;
  styleID: number;
  pronunciation?: string | undefined;
  definition?: string | undefined;
  language?: Language | undefined;
  languageID?: number | undefined;
  folder?: Folder | undefined;
  folderID: number;
}

export interface Style {
  id?: number | undefined;
  image?: string | undefined;
  format?: StyleFormat | undefined;
  fontSize?: number | undefined;
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
  borderColor?: string | undefined;
  borderWeight?: number | undefined;
  rowStart: number;
  rowExtend?: number | undefined;
  colStart: number;
  colExtend?: number | undefined;
}

export interface Tag {
  id?: number | undefined;
  name: string;
  board?: Board | undefined;
  boardID: number;
}

export interface ButtonsOnTags {
  id?: number | undefined;
  button?: Button | undefined;
  buttonID: number;
  tag?: Tag | undefined;
  tagID: number;
}

export interface Language {
  id?: number | undefined;
  name: string;
  direction: LanguageDirection;
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

export const UserSchema: z.ZodType<User> = z.object({
  id: z.number().optional(),
  username: z.string(),
  password: z.string().transform(async (value) => {
    const hashedPassword = await bcrypt.hash(value, 10);
    return hashedPassword;
  }),
});

export const LoginSchema: z.ZodType<Login> = z.object({
  username: z.string(),
  password: z.string(),
});

export const SessionSchema: z.ZodType<Session> = z.object({
  id: z.string(),
  user: UserSchema.optional(),
  userID: z.number(),
  expiresAt: z.date(),
});

export const SettingsSchema: z.ZodType<Settings> = z.object({
  id: z.number().optional(),
  contrast: z.nativeEnum(ContrastMode),
});

export const ProfileSchema: z.ZodType<Profile> = z.object({
  id: z.number().optional(),
  default: z.boolean(),
  name: z.string(),
  user: UserSchema.optional(),
  userID: z.number(),
  settings: SettingsSchema.optional(),
  settingsID: z.number(),
});

export const TemplateSchema: z.ZodType<Template> = z.object({
  id: z.number().optional(),
});

export const BoardSchema: z.ZodType<Board> = z.object({
  id: z.number().optional(),
});

export const StyleSchema: z.ZodType<Style> = z.object({
  id: z.number().optional(),
  image: z.string().optional(),
  format: z.nativeEnum(StyleFormat).default(StyleFormat.IMAGE_TOP),
  fontSize: z.number().default(16),
  backgroundColor: z.string().default("FFFFFF"),
  textColor: z.string().default("000000"),
  borderColor: z.string().default("000000"),
  borderWeight: z.number().default(1),
  rowStart: z.number(),
  rowExtend: z.number().default(1),
  colStart: z.number(),
  colExtend: z.number().default(1),
});

export const FolderSchema: z.ZodType<Folder> = z.lazy(() =>
  z.object({
    id: z.number().optional(),
    name: z.string(),
    style: StyleSchema.optional(),
    styleID: z.number(),
    board: BoardSchema.optional(),
    boardID: z.number().optional(),
    parent: FolderSchema.optional(),
    parentID: z.number().optional(),
  })
);

export const LanguageSchema: z.ZodType<Language> = z.object({
  id: z.number().optional(),
  name: z.string(),
  direction: z.nativeEnum(LanguageDirection),
});

export const ButtonSchema: z.ZodType<Button> = z.object({
  id: z.number().optional(),
  name: z.string(),
  style: StyleSchema.optional(),
  styleID: z.number(),
  pronunciation: z.string().optional(),
  definition: z.string().optional(),
  language: LanguageSchema.optional(),
  languageID: z.number().optional(),
  folder: FolderSchema.optional(),
  folderID: z.number(),
});

export const TagSchema: z.ZodType<Tag> = z.object({
  id: z.number().optional(),
  name: z.string(),
  board: BoardSchema.optional(),
  boardID: z.number(),
});

export const ButtonsOnTagsSchema: z.ZodType<ButtonsOnTags> = z.object({
  id: z.number().optional(),
  button: ButtonSchema.optional(),
  buttonID: z.number(),
  tag: TagSchema.optional(),
  tagID: z.number(),
});
