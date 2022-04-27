import ValidatorInterface, { FieldErrors } from "./validator.interface";
import { validateSync, ValidationError } from "class-validator";

export default abstract class ValidatorClassValidator<T>
  implements ValidatorInterface<T>
{
  errors: FieldErrors = null;
  validate(data: any) {
    this.errors = null;
    const errors: ValidationError[] = validateSync(data);
    if (errors.length > 0) {
      this.errors = {};
      errors.forEach((error) => {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      });
    }
  }

  get isValid(): boolean {
    return this.errors === null;
  }
}
