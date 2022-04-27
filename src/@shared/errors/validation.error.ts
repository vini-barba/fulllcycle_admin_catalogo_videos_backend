import { FieldErrors } from "../domain/validator/validator.interface";

export default class EntityValidationError extends Error {
  constructor(public error: FieldErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
