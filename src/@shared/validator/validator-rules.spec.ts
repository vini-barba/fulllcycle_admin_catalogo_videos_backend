import ValidatorRules from "./validator-rules";
describe("Test Validator rules", () => {
  describe("value method", () => {
    it("should return a ValidatorRules instance", () => {
      const validator = ValidatorRules.value("test", "field");
      expect(validator).toBeInstanceOf(ValidatorRules);
    });

    it("should set _value and _field", () => {
      const validator = ValidatorRules.value("test", "field");
      expect(validator["_value"]).toBe("test");
      expect(validator["_field"]).toBe("field");
    });
  });

  describe("required method", () => {
    it("should return the instance of ValidatorRules when the value is valid", () => {
      const validator = ValidatorRules.value("test", "field");

      const valid = validator.required();

      expect(valid).toBeInstanceOf(ValidatorRules);
    });

    it("should throw an error when the value is not valid", () => {
      const arrange = [null, undefined, ""];
      arrange.forEach((value) => {
        const validator = ValidatorRules.value(value, "field");
        expect(() => {
          validator.required();
        }).toThrow("The field is required");
      });
    });
  });

  describe("string method", () => {
    it("should return the instance of ValidatorRules when the value is valid", () => {
      const validator = ValidatorRules.value("test", "field");

      const valid = validator.string();

      expect(valid).toBeInstanceOf(ValidatorRules);
    });

    it("should throw an error when the value is not valid", () => {
      const arrange = [true, 98, 0, { prop1: "" }];

      arrange.forEach((value) => {
        const validator = ValidatorRules.value(value, "field");
        expect(() => {
          validator.string();
        }).toThrow("The field must be a string");
      });
    });
  });

  describe("maxLength method", () => {
    it("should return the instance of ValidatorRules when the value is valid", () => {
      const arrange = [4, 5, 10];
      arrange.forEach((maxLength) => {
        const validator = ValidatorRules.value("test", "field");

        const valid = validator.maxLength(maxLength);

        expect(valid).toBeInstanceOf(ValidatorRules);
      });
    });

    it("should throw an error when the value is not valid", () => {
      const arrange = [3, 1, 0, -5];

      arrange.forEach((maxLength) => {
        const validator = ValidatorRules.value("test", "field");
        expect(() => {
          validator.maxLength(maxLength);
        }).toThrow(
          "The field length must be less than or equal to " + maxLength
        );
      });
    });
  });

  describe("boolean method", () => {
    it("should return the instance of ValidatorRules when the value is valid", () => {
      const arrange = [false, true];
      arrange.forEach((value) => {
        const validator = ValidatorRules.value(value, "field");

        const valid = validator.boolean();

        expect(valid).toBeInstanceOf(ValidatorRules);
      });
    });

    it("should throw an error when the value is not valid", () => {
      const arrange = [3, 1, 0, -5, "", "test", { prop1: "teste" }];

      arrange.forEach((value) => {
        const validator = ValidatorRules.value(value, "field");
        expect(() => {
          validator.boolean();
        }).toThrow("The field must be a boolean");
      });
    });
  });
  describe("chained methods", () => {
    it("should throw error when validate with chained methods with string", () => {
      const arrange = [
        { input: null, message: "The field is required" },
        { input: undefined, message: "The field is required" },
        { input: "", message: "The field is required" },
        { input: true, message: "The field must be a string" },
        { input: 0, message: "The field must be a string" },
        { input: 4, message: "The field must be a string" },
        { input: { prop1: 8 }, message: "The field must be a string" },
        {
          input: "test",
          message: "The field length must be less than or equal to 3",
        },
      ];

      arrange.forEach((test) => {
        const validator = ValidatorRules.value(test.input, "field");
        expect(() => {
          validator.required().string().maxLength(3);
        }).toThrow(test.message);
      });
    });

    it("shouldvalidate with chained methods with string", () => {
      const arrange = [
        { input: undefined, maxLength: 5 },
        { input: null, maxLength: 5 },
        { input: "test", maxLength: 5 },
        { input: "test", maxLength: 4 },
        { input: "test", maxLength: 500 },
        { input: "test a string with space", maxLength: 500 },
      ];

      arrange.forEach((test) => {
        const validator = ValidatorRules.value(test.input, "field");
        expect(() => {
          const valid = validator.string().maxLength(test.maxLength);
          expect(valid).toBeInstanceOf(ValidatorRules);
        }).not.toThrow();
      });
    });

    it("should throw error when validate with chained methods with boolean", () => {
      const arrange = [
        { input: null, message: "The field is required" },
        { input: undefined, message: "The field is required" },
        { input: "", message: "The field is required" },
        { input: "test", message: "The field must be a boolean" },
        { input: { prop1: "" }, message: "The field must be a boolean" },
        { input: 0, message: "The field must be a boolean" },
        { input: 1, message: "The field must be a boolean" },
        { input: 3, message: "The field must be a boolean" },
      ];
      arrange.forEach((test) => {
        const validator = ValidatorRules.value(test.input, "field");
        expect(() => {
          validator.required().boolean();
        }).toThrow(test.message);
      });
    });

    it("should validate with chained methods with boolean", () => {
      const arrange = [{ input: true }, { input: false }];
      arrange.forEach((test) => {
        const validator = ValidatorRules.value(test.input, "field");
        expect(() => {
          const valid = validator.required().boolean();
          expect(valid).toBeInstanceOf(ValidatorRules);
        }).not.toThrow;
      });
    });
  });
});
