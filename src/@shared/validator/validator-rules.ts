import ValidationError from "../errors/validation.error";
export default class ValidatorRules {
  private constructor(private _value: any, private _field: string) {}

  static value(_value: any, _field: string): ValidatorRules {
    return new ValidatorRules(_value, _field);
  }

  required(): Omit<this, "required"> {
    if (isEmpty(this._value) || this._value === "") {
      throw new ValidationError(`The ${this._field} is required`);
    }
    return this;
  }

  string(): Omit<this, "string"> {
    if (!isEmpty(this._value) && typeof this._value !== "string") {
      throw new ValidationError(`The ${this._field} must be a string`);
    }
    return this;
  }

  maxLength(max: number): Omit<this, "maxLength"> {
    if (!isEmpty(this._value) && this._value.length > max) {
      throw new ValidationError(
        `The ${this._field} length must be less than or equal to ${max}`
      );
    }
    return this;
  }

  boolean(): Omit<this, "boolean"> {
    if (!isEmpty(this._value) && typeof this._value !== "boolean") {
      throw new ValidationError(`The ${this._field} must be a boolean`);
    }
    return this;
  }
}

function isEmpty(value: any) {
  return value === undefined || value === null;
}
