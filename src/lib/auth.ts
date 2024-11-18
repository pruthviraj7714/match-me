import { compare } from "bcrypt";
import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { JWT } from "next-auth/jwt";


interface CustomSession extends Session {
    user: {
      id: string;
      username: string;
    };
  }
  
  interface CustomUser extends NextAuthUser {
    id: string;
    username: string;
  }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "tony43",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          throw new Error("No user found with the provided credentials");
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.username = (user as CustomUser).username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        (session as CustomSession).user = {
          id: token.id as string,
          username: token.username as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
