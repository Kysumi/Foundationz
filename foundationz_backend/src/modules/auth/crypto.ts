import { User } from "@orm/user";
import crypto from "crypto";

const ITERATIONS = 1000;
const SALT_LENGTH = 16;
const LENGTH = 64;
const DIGEST = "sha512";
const ENCODING = "hex";

//Returns a tuple of the hashed password and salt key,
// - creates a new salt key if one is not provided
export const hashString = (input: string, salt : string = "") =>{
    if(!salt){
        salt = crypto.randomBytes(SALT_LENGTH).toString(ENCODING);    }

    const hashed = crypto
        .pbkdf2Sync(input, salt, ITERATIONS, LENGTH, DIGEST)
        .toString(ENCODING);

    return {hashed, salt};
}

//Validates input and salt against the specified hash
export const validateHash = (input: string, salt : string, target :string) =>{
    const {hashed} = hashString(input,salt);
    return hashed === target;
}

//Validates the supplied password against the one stored on the user
export const validatePassword = (user : User  , password :string) => {
    return validateHash(password,user.salt,user.password);
}