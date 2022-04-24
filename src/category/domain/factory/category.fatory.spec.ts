import CategoryFactory, { CategoryFactoryProps } from "./category.factory";
import { v4 as uuid, validate as uuidValidator } from "uuid";

describe("Test category factory", () => {
  it("Should create a category with only the name", () => {
    const categoryProps: CategoryFactoryProps = {
      name: "category 0",
    };

    const category = CategoryFactory.create(categoryProps);

    expect(category.name).toBe(categoryProps.name);
    expect(uuidValidator(category.id)).toBeTruthy();
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBeNull();
  });

  it("Should create a category with the informed id", () => {
    const id = uuid();
    const categoryProps: CategoryFactoryProps = {
      id: id,
      name: "category 0",
    };

    const category = CategoryFactory.create(categoryProps);

    expect(category.name).toBe(categoryProps.name);
    expect(category.id).toBe(id);
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBeNull();
  });

  it("Should create a category with all fields", () => {
    const id = uuid();
    const createdAt = new Date();
    const categoryProps: CategoryFactoryProps = {
      id: id,
      name: "category 0",
      description: "description",
      isActive: false,
      createdAt: createdAt,
    };

    const category = CategoryFactory.create(categoryProps);

    expect(category.name).toBe(categoryProps.name);
    expect(category.id).toBe(id);
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBe(createdAt);
    expect(category.description).toBe("description");
  });
});
