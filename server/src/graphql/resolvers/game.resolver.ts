import { Resolver, Mutation, Arg } from "type-graphql";
import multer from "multer";


@Resolver()
export class uploadGameResolver {
    @Mutation(() => Boolean)
    async getFileData(@Arg("gameFile",  () => String){}) {
        const upload = multer({ storage: multer.memoryStorage() })
        console.log("Placeholder")
    }
}
