import {faker} from '@faker-js/faker';
import {v4} from 'uuid'

export const seed = async (knex) => {
    const makeNewFakeUser = () => ({
        id: v4(),
        first_name: `${faker.name.firstName()}`,
        surname: `${faker.name.lastName()}`,
        email: faker.internet.email(),
        created_at: new Date()
    })

    // Deletes ALL existing entries
    await knex('users').del()
    await knex('users').insert(Array.from(Array(5)).map(makeNewFakeUser));

    return knex;
};
