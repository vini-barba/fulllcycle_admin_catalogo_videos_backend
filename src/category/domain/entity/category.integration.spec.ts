import Category from "./category";

describe("Integration test Category", () => {
  describe("create", () => {
    it("should throw an error when id is not valid", () => {
      expect(
        () => new Category({ id: null, name: "name" })
      ).containsErrorMessages({
        id: ["id should not be empty", "id must be a string"],
      });

      expect(
        () => new Category({ id: 1 as any, name: "name" })
      ).containsErrorMessages({
        id: ["id must be a string"],
      });

      expect(
        () => new Category({ id: "", name: "name" })
      ).containsErrorMessages({
        id: ["id should not be empty"],
      });
    });

    it("should throw an error when name is not valid", () => {
      expect(
        () => new Category({ id: "id", name: null })
      ).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () => new Category({ id: "id", name: 1 as any })
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => new Category({ id: "id", name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(
        () => new Category({ id: "id", name: "t".repeat(300) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should throw an error when description is not valid", () => {
      expect(
        () => new Category({ id: "id", name: "name", description: 5 } as any)
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should throw an error when isActive is not valid", () => {
      expect(
        () => new Category({ id: "id", name: "name", isActive: "true" as any })
      ).containsErrorMessages({
        isActive: ["isActive must be a boolean value"],
      });

      expect(
        () => new Category({ id: "id", name: "name", isActive: 1 as any })
      ).containsErrorMessages({
        isActive: ["isActive must be a boolean value"],
      });
    });

    it("should throw an error when createdAt is not valid", () => {
      expect(
        () => new Category({ id: "id", name: "name", createdAt: "true" as any })
      ).containsErrorMessages({
        createdAt: ["createdAt must be a Date instance"],
      });

      expect(
        () => new Category({ id: "id", name: "name", createdAt: 1 as any })
      ).containsErrorMessages({
        createdAt: ["createdAt must be a Date instance"],
      });
    });

    it("should throw an error when neither the id nor the name are valid", () => {
      expect(
        () => new Category({ id: null, name: null })
      ).containsErrorMessages({
        id: ["id should not be empty", "id must be a string"],
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () => new Category({ id: 1 as any, name: 1 as any })
      ).containsErrorMessages({
        id: ["id must be a string"],
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("Should create a category when props are valid", () => {
      const arrange = [
        {
          input: {
            id: "id",
            name: "category",
          },
        },
        {
          input: {
            id: "id",
            name: "category",
            description: "description",
            isActive: false,
          },
        },
        {
          input: {
            id: "id",
            name: "category",
            description: "description",
            isActive: false,
            createdAt: new Date(),
          },
        },
      ];

      arrange.forEach((testCase) => {
        expect(() => {
          new Category(testCase.input);
        }).not.toThrow();
      });
    });
  });

  describe("update", () => {
    it("should throw an error when name is not valid", () => {
      const category = new Category({ id: "id", name: "name" });

      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.update(1 as any, null)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.update("", null)).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() =>
        category.update("t".repeat(300), null)
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should throw an error when description is not valid", () => {
      const category = new Category({ id: "id", name: "name" });
      expect(() => category.update("name 1", 1 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("Should update category when props are valid", () => {
      const arrange = [
        {
          input: {
            name: "category",
            description: "description",
          },
        },
        {
          input: {
            name: "category",
            description: "",
          },
        },
        {
          input: {
            name: "category",
            description: null,
          },
        },
      ];

      arrange.forEach((testCase) => {
        const category = new Category({ id: "id", name: "name" });
        expect(() => {
          const name = testCase.input.name;
          const description = testCase.input.description;
          category.update(name, description);
        }).not.toThrow();
      });
    });
  });
});
