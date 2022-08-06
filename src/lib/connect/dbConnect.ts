import prisma from "./client"

export default async function main() {
    await prisma.$connect()
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.log("Disconnected from Prisma")
    })

