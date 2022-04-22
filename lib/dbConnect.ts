import mongoose from 'mongoose'


async function dbConnect() {
    const mongoDB = process.env.MONGODB_URI

    if (!mongoDB) throw new Error("Please define the MONGODB_URI environment variable inside .env.local")


    await mongoose.connect(mongoDB).catch(error => console.log(error))
    mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"))

}

export default dbConnect