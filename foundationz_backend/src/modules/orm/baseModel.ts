import { Model } from "objection";

export class BaseModel extends Model {
  updatedAt: Date;
  createdAt: Date;

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
