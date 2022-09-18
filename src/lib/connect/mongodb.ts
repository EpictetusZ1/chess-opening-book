import { MongoClient } from "mongodb"

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI || ""
let client: MongoClient = new MongoClient(uri)
let clientPromise = client.connect()

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.

}

export default clientPromise