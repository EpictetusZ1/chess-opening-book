import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../lib/connect/prisma";


export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        })
    ],
    callbacks: {
        async session({ session, user }) {
            console.log("this might be where I should check if a user profile exists")
            console.log("user: ", user)
            return Promise.resolve({
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            })
        },
    },
})
