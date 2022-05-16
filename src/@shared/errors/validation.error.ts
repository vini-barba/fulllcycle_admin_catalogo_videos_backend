import { FieldErrors } from "../domain/validator/validator.interface";

export default class EntityValidationError extends Error {

  constructor(public error: FieldErrors) {
    super(Object.keys(error).map(
      (key) => `${key}: ${error[key]}`
    ).join(", "));
    
   
    this.name = "EntityValidationError";
  }
}
