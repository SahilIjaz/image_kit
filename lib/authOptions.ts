import { AuthOptions } from "next-auth";
import CredentialsPovider from "next-auth/providers/credentials";
import { userAgent } from "next/server";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsPovider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email andpassword are required.");
        }

        try {
          await dbConnect();

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("Invalid email id.");
          }

          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordCorrect) {
            throw new Error("Invalid password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};