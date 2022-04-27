import Category from "./category";
import { CategoryProps } from "./category.interface";

describe("Unit Test Category entity", () => {
  it("Should create a Category with only the id and the name", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
    };

    const category = new Category(props);

    expect(category.id).toBe(props.id);
    expect(category.name).toBe(props.name);
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBeNull();
  });

  it("Should create a Category with description", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      description: "description",
    };

    const category = new Category(props);

    expect(category.id).toBe(props.id);
    expect(category.name).toBe(props.name);
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBe(props.description);
  });

  it("Should create a Category with createdAt", () => {
    const createdAt = new Date();
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      createdAt: createdAt,
    };

    const category = new Category(props);

    expect(category.id).toBe(props.id);
    expect(category.name).toBe(props.name);
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBe(createdAt);
    expect(category.description).toBeNull();
  });

  it("Should create a Category with isActive", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      isActive: false,
    };

    const category = new Category(props);

    expect(category.id).toBe(props.id);
    expect(category.name).toBe(props.name);
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.description).toBeNull();
  });

  it("Should create a Category with all fields", () => {
    const createdAt = new Date();
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      description: "description",
      isActive: false,
      createdAt: createdAt,
    };

    const category = new Category(props);

    expect(category.id).toBe(props.id);
    expect(category.name).toBe(props.name);
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBe(createdAt);
    expect(category.description).toBe("description");
  });

  it("should update name and description", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
    };

    const category = new Category(props);
    expect(category.name).toBe(props.name);
    expect(category.description).toBe(null);

    const updatedValues0 = {
      name: "category 1",
      description: "description",
    };
    category.update(updatedValues0.name, updatedValues0.description);
    expect(category.name).toBe(updatedValues0.name);
    expect(category.description).toBe(updatedValues0.description);

    const updatedValues1: any = {
      name: "category 2",
      description: null,
    };
    category.update(updatedValues1.name, updatedValues1.description);
    expect(category.name).toBe(updatedValues1.name);
    expect(category.description).toBeNull();
  });

  it("should activate a category", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      isActive: false,
    };

    const category = new Category(props);
    expect(category.isActive).toBe(false);

    category.activate();
    expect(category.isActive).toBe(true);
  });

  it("should deactivate a category", () => {
    const props: CategoryProps = {
      id: "id",
      name: "category 0",
      isActive: true,
    };

    const category = new Category(props);
    expect(category.isActive).toBe(true);

    category.deactivate();
    expect(category.isActive).toBe(false);
  });
});
