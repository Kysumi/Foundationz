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
    await knex('users').insert([
        {
            id: '7efe2d3a-ace4-11ec-b909-0242ac120002',
            first_name: `abomy`,
            surname: `foote`,
            email: 'aboomy@gmail.com',
            created_at: new Date()
        }
    ]);
    await knex('users').insert(Array.from(Array(5)).map(makeNewFakeUser));

    return knex;
};
