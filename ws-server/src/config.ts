import { config } from "dotenv";
config();

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
