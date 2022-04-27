import ValueObject from "../value.object";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
import { v4 as uuid, validate as uuidValidator } from "uuid";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidator(this._value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
