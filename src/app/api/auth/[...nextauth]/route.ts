import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";  

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "Email", placeholder: "agus" },
        password: { label: "Password", type: "password", placeholder: "****" },
        },
        async authorize(credentials, req) {
            await connectDB(); 
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
            }
            const user = await User.findOne({ email: credentials.email }).select('+password');
            if (!user) {
                throw new Error("No user found with the given email");
            }
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid password");
            }

            return user;
        },
    }),
  ], 

    pages: {
        signIn: '/login',
        /* signOut: '/logout',
        error: '/error',
        verifyRequest: '/verify-request',
        newUser: null // Will disable the new account creation screen */
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        }
        
    }
});
export { handler as GET, handler as POST };
//export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic
