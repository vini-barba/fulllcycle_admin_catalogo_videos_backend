export type FieldErrors = {
  [field: string]: string[];
};

export default interface ValidatorInterface<T> {
  validate(entity: T): void;
  errors: FieldErrors;
  get isValid(): boolean;
}
