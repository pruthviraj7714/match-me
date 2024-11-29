import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {

  interface Session {
    user: {
      id: string;
      username: string;
      image : string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    image : string;
  }
}