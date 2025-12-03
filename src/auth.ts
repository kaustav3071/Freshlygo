import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectToDB from "../src/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          await connectToDB();
          const email = credentials.email as string;
          const password = credentials.password as string;
          const userModel = await User.findOne({ email });
          if (!userModel) {
            throw new Error("No user found with this email");
          }
          if (!userModel.password) {
            throw new Error("Please use Google sign-in for this account");
          }
          const isPasswordValid = await bcrypt.compare(password, userModel.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return {
            id: userModel._id.toString(),
            name: userModel.name,
            email: userModel.email,
            role: userModel.role,
          }
        }
        catch (error) {
          console.log(error);
          throw new Error("Something went wrong");
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectToDB();
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          })
        }
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      if (trigger == "update")
      {
        token.role = session.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.AUTH_SECRET,
})