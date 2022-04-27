import { deepFreeze } from "./object";
describe("Unit test Object utils", () => {
  it("should be immutable", () => {
    const input = { field: { nested: "test" } };
    const v = deepFreeze(input);
    expect(() => {
      v.field.nested = "test2";
    }).toThrow(
      "Cannot assign to read only property 'nested' of object '#<Object>'"
    );

    const inputDate = { field: { nested: new Date() } };
    const v1 = deepFreeze(inputDate);
    expect(() => {
      v1.field.nested = new Date();
    }).toThrow(
      "Cannot assign to read only property 'nested' of object '#<Object>'"
    );
  });
});
