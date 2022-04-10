import { ApolloServer } from "apollo-server-micro";

const server = new ApolloServer({

})

const startServer = server.start()

export default async function handler(req: any, res: any) {
    await startServer
    await server.createHandler({ path: "/api/graphql"})(req, res)
}