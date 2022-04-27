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
    expect(v.field.nested).toBe("test");

    const inputString = { field: "test" };
    const v2 = deepFreeze(inputString);
    expect(() => {
      v2.field = "test2";
    }).toThrow(
      "Cannot assign to read only property 'field' of object '#<Object>'"
    );
    expect(v2.field).toBe("test");
  });
});
