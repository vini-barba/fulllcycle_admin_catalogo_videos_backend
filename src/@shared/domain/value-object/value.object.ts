import { deepFreeze } from "../utils/object";
export default abstract class ValueObject<T = any> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
    deepFreeze(this._value);
  }

  public get value(): T {
    return this._value;
  }

  toString = () => {
    if (typeof this._value !== "object" || this._value === null) {
      try {
        return this._value.toString();
      } catch (error) {
        return this._value + "";
      }
    }
    const valueStr = this._value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this._value)
      : valueStr;
  };
}
