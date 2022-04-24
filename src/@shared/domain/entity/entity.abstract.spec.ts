import Entity from "./entity.abstract";

class StubEntity extends Entity<{ prop0: string; prop1: number; id: string }> {}

describe("Test Entity abstract", () => {
  it("should convert an entity to json", () => {
    const props = { id: "id", prop0: "test", prop1: 5 };
    const entity = new StubEntity(props);
    expect(entity.toJSON()).toStrictEqual(props);
  });

  it("should set id", () => {
    const props = { id: "id", prop0: "test", prop1: 5 };
    const entity = new StubEntity(props);
    expect(entity.id).toBe("id");
  });
});
