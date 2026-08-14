import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

// const userList = [
//     { name: "fleming", password: "1234" }
// ];

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "your email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;
                //check user name
                // const user = userList.find(u => u.name === username);

                //check from db
                const user = await dbConnect("users").findOne({ email: credentials.email });
                if (!user) {
                    return null
                }

                //match user password
                // const isPassword = user.password === password;

                //match hash and password by compare
                const isPassword = await bcrypt.compare(password, user.password)
                if (isPassword) {
                    return user
                };

                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            if (token) {
                session.role = token.role
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                token.role = user.role
            }
            return token
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };