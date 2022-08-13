import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/connect/mongodb"



export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        })
    ],
    callbacks: {
        async session({ session, user }) {
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