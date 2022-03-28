import {extendType, nonNull, stringArg} from "nexus";
import crypto from 'crypto';
import {User} from "@orm/user";
import {v4} from "uuid";

export const CreateUser =  extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createUser', {
            type: 'User',
            args: {
                first_name: nonNull(stringArg()),
                surname: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: (_, { first_name,surname, email, password }) => {
                const id = v4();
                const userSalt = crypto.randomBytes(16).toString('hex');
                const passwordHash = crypto
                    .pbkdf2Sync(password, userSalt, 1000, 64, 'sha512')
                    .toString('hex');

                return User.query().insert({
                    id: id,
                    first_name: first_name,
                    surname: surname,
                    email: email,
                    password: passwordHash,
                    salt: userSalt,
                    created_at: new Date(),
                });
            },
        });
    },
});
