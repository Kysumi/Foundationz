import passportJWT from 'passport-jwt'
import {User} from "@orm/user";
import jwt from "jsonwebtoken";

const { Strategy, ExtractJwt, } = passportJWT

const params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export const authStrategy = new Strategy(params, (payload, done) => {
    console.log("test")
    const user = User.query().findById(payload.id) || null
    return done(null, user)
})


export const signToken = (user: User) =>{
    return jwt.sign({
        user_id: user.id,
        email: user.email
    },process.env.JWT_SECRET || "test", {
        expiresIn: process.env.JWT_LIFETIME
    })
}