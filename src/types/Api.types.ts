import {NextApiRequest} from "next";
import {UserProfile} from "./Main.types";

// Extending the NextApiRequest type with our own custom properties
export interface ExtendedNextApiRequest<T> extends NextApiRequest {
    body: T
}

export interface IUserApi {
    id: string
}
