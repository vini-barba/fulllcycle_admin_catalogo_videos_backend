import { FieldErrors } from "./src/@shared/domain/validator/validator.interface";
declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldErrors) => R;
    }
  }
}

export {};
