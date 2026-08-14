import { authOptions } from "@/lib/authOpts";
import NextAuth from "next-auth";

// const userList = [
//     { name: "fleming", password: "1234" }
// ];

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };