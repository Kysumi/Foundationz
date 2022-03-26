import { Request } from "express";
import {getUser} from "../auth/getUser";
import {User} from "../orm/user";

export interface Context {
    user?: User;
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
    const token = req.headers.authorization ? req.headers.authorization : '';
    const user = await getUser(token);

    return {
        user
    }
};