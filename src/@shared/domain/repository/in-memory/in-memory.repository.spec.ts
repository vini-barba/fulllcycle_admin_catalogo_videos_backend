import NotFoundError from "../../../errors/not-found.error";
import Entity from "../../entity/entity.abstract";
import InMemoryRepository from "./in-memory.repository";

describe("Test InMemoryRepository", () => {
  class StubProps extends Entity {
    name: string;
    price: number;

    update(props: Partial<StubProps>): void {
      this["props"] = { ...this.props, ...props };
    }
  };
  class StubInMemoryRepository extends InMemoryRepository<StubProps> {}
  let stubInMemoryRepository: InMemoryRepository<StubProps>;
  const item1 = new StubProps( {
    id: "1",
    name: "test",
    price: 1,
  });
  const item2 =  new StubProps( {
    id: "2",
    name: "test2",
    price: 2,
  });

  beforeEach(() => {
    stubInMemoryRepository = new StubInMemoryRepository();
  });

  describe("insert", () => {
    it("should insert a new item", async () => {
 
      await stubInMemoryRepository.insert(item1);
      expect(stubInMemoryRepository.items.length).toBe(1);
      expect(stubInMemoryRepository.items[0]).toEqual(item1);
    });
    it("should throw an error if the item already exists", async () => {
      await stubInMemoryRepository.insert(item1);
      expect(stubInMemoryRepository.items.length).toBe(1);
      expect(stubInMemoryRepository.items[0]).toEqual(item1);
      await expect(stubInMemoryRepository.insert(item1)).rejects.toThrowError(
        "Item with id 1 already exists"
      );
    });
  });

  describe("update", () => {
    it("should update an existing item", async () => {
      await stubInMemoryRepository.insert(item1);
      const updatedItem =  {
        name: "updated",
        price: 2,
      };
      item1.update(updatedItem);
      const expected = new StubProps({id: "1", ...updatedItem});
      await stubInMemoryRepository.update(item1);
      expect(stubInMemoryRepository.items[0].id).toEqual(expected.id);
      expect(stubInMemoryRepository.items[0].name).toEqual(expected.name);
      expect(stubInMemoryRepository.items[0].price).toEqual(expected.price);
    });

    it("should throw an error if the item does not exist", async () => {
      await expect(stubInMemoryRepository.update(item1)).rejects.toThrow(
        new NotFoundError(`Item with id 1 does not exist`)
      );
    });
  });

  describe("delete", () => {
    it("should delete an existing item", async () => {
      await stubInMemoryRepository.insert(item1);
      await stubInMemoryRepository.delete(item1.id);
      expect(stubInMemoryRepository.items.length).toBe(0);
    });

    it("should throw an error if the item does not exist", async () => {
      await expect(stubInMemoryRepository.delete(item1.id)).rejects.toThrow(
        new NotFoundError(`Item with id 1 does not exist`)
      );
    });
  });

  describe("findById", () => {
    it("should find an existing item", async () => {
      await stubInMemoryRepository.insert(item1);
      const foundItem = await stubInMemoryRepository.findById(item1.id);
      expect(foundItem).toEqual(item1);
    });

    it("should throw an error if the item does not exist", async () => {
      await expect(stubInMemoryRepository.findById(item1.id)).rejects.toThrow(
        new NotFoundError(`Item with id 1 does not exist`)
      );
    });
  });

  describe("findAll", () => {
    it("should find all items", async () => {
      await stubInMemoryRepository.insert(item1);
      await stubInMemoryRepository.insert(item2);
      const foundItems = await stubInMemoryRepository.findAll();
      expect(foundItems.length).toBe(2);
      expect(foundItems[0]).toEqual(item1);
      expect(foundItems[1]).toEqual(item2);
    });
  });
});
