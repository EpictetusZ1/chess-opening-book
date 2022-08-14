import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import clientPromise from "../../../lib/connect/mongodb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {prisma} from "../../../lib/connect/prisma";


export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,
    },
    jwt: {},
    // callbacks: {
    //     async session({ session, user }) {
    //         return Promise.resolve({
    //             ...session,
    //             user: {
    //                 ...session.user,
    //                 id: user.id,
    //             },
    //         })
    //     },
    // },
})