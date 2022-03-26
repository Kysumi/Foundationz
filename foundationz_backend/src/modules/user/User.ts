import {Model} from "objection";

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            children: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'persons.id',
                    to: 'persons.parentId'
                }
            }
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'string'},
            }
        }
    }
}

export default User;