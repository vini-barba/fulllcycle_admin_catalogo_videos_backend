import ValueObject from "./value.object";

class StubValueObject extends ValueObject {}

describe("Test ValueObject", () => {
  it("Should set a value", () => {
    const valueObject0 = new StubValueObject("test");
    expect(valueObject0.value).toBe("test");

    const prop = {
      field0: "field0",
      field1: "field1",
    };
    const valueObject1 = new StubValueObject(prop);
    expect(valueObject1.value).toStrictEqual(prop);
  });

  it("should convert to a string", () => {
    const prop = {
      field0: "field0",
      field1: "field1",
    };
    const date = new Date();
    const arrange = [
      { input: null, expected: "null" },
      { input: undefined, expected: "undefined" },
      { input: "", expected: "" },
      { input: "test 0", expected: "test 0" },
      { input: 0, expected: "0" },
      { input: 1, expected: "1" },
      { input: 5, expected: "5" },
      { input: true, expected: "true" },
      { input: false, expected: "false" },
      { input: prop, expected: JSON.stringify(prop) },
      { input: date, expected: date.toString() },
    ];

    arrange.forEach(({ input, expected }) => {
      const v = new StubValueObject(input);
      expect(v + "").toBe(expected);
    });
  });

  it("should be immutable", () => {
    const input = { field: { nested: "test" } };
    const v = new StubValueObject(input);
    expect(() => {
      v["_value"].field.nested = "test2";
    }).toThrow(
      "Cannot assign to read only property 'nested' of object '#<Object>'"
    );

    const inputDate = { field: { nested: new Date() } };
    const v1 = new StubValueObject(inputDate);
    expect(() => {
      v1["_value"].field.nested = new Date();
    }).toThrow(
      "Cannot assign to read only property 'nested' of object '#<Object>'"
    );
  });
});
