import {Model,ModelObject } from "objection";
import Organization from "../organization/Organization";

class User extends Model {
    id: string;
    name: string;
    email: string;

    organizations: Organization[]

    static tableName = 'users'

    static get relationMappings() {
        return {
            organizations: {
                relation: Model.ManyToManyRelation,
                modelClass: Organization,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'organization_user.user_id',
                        to: 'organization_user.organization_id'
                    },
                    to: 'organizations.id'
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
                email: {type: 'string'},
                name: {type: 'string'}
            }
        }
    }
}

export type UserShape = ModelObject<User>;

export default User;