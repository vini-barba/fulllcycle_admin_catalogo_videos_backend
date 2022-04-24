import { v4 as uuid, validate as uuidValidator } from "uuid";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id";

describe("Test unique entity id", () => {
  it("Should create an id when none is given", () => {
    const uniqueEntityId = new UniqueEntityId();
    const id = uniqueEntityId.value;
    const isValidUuid = uuidValidator(id);

    expect(isValidUuid).toBeTruthy();
  });

  it("Should use the id informed", () => {
    const existentUuid = uuid();

    const uniqueEntityId = new UniqueEntityId(existentUuid);

    const id = uniqueEntityId.value;
    expect(id).toBe(existentUuid);
  });

  it("Should throw an error when an invalid is is informed", () => {
    expect(() => {
      new UniqueEntityId("id");
    }).toThrow(new InvalidUuidError());
  });
});
