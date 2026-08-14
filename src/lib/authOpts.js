import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { dbConnect } from "@/lib/dbConnect";

export const authOptions = {
    providers: [
        // Credentials login
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
        }),

        //using google provider login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        //using github provider login
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log({ user, account, profile, email, credentials });
            try {
                const payload = {
                    ...user,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    role: "user",
                    createdAt: new Date().toISOString()
                };

                if (!user?.email) {
                    return false
                };

                const isExist = await dbConnect("users").findOne({ email: user.email, providerId: account.providerAccountId });

                if (!isExist) {
                    const result = await dbConnect("users").insertOne(payload);
                }

                return true;
            } catch (error) {
                return false
            }
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
            if (user) {
                token.role = user.role
            }
            return token
        }
    }
};