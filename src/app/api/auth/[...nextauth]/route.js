import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const userList = [
    { name: "fleming", password: "1234" }
];

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "your name" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const { username, password } = credentials;
                //check user name
                const user = userList.find(u => u.name === username);
                if (!user) {
                    return null
                }

                //match user password
                const isPassword = user.password === password;
                if (isPassword) {
                    return user
                };

                return null;
            }
        })
    ]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };