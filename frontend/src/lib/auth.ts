import { compare } from "bcrypt";
import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { JWT } from "next-auth/jwt";
import { sign } from "jsonwebtoken";


interface CustomSession extends Session {
    user: {
      id: string;
      username: string;
      image : string;
      accessToken : string;
    };
  }
  
  interface CustomUser extends NextAuthUser {
    id: string;
    username: string;
    image: string;
    accessToken : string;
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

        const accessToken = sign({
          userId : user.id
        }, process.env.NEXTAUTH_SECRET!);


        return {
          id: user.id.toString(),
          username: user.username,
          name: user.name,
          image: user.profilePicture,
          accessToken
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
        token.image = (user as CustomUser).image;
        token.accessToken = (user as CustomUser).accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        (session as CustomSession).user = {
          id: token.id as string,
          username: token.username as string,
          image : token.image as string,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
