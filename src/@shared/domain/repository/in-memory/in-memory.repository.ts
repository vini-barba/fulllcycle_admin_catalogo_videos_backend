import NotFoundError from "../../../errors/not-found.error";
import Entity from "../../entity/entity.abstract";
import RepositoryInterface from "../repository.interface";

export default abstract class InMemoryRepository<T extends Entity>
  implements RepositoryInterface<T>
{
  public items: T[] = [];

  public async findById(id: string): Promise<T> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Item with id ${id} does not exist`);
    }
    return item;
  }

  public async findAll(): Promise<T[]> {
    return this.items;
  }

  public async insert(item: T): Promise<void> {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    this.items.push(item);
  }

  public async update(item: T): Promise<void> {
    const existingItem = await this.findById(item.id);

    this.items.splice(this.items.indexOf(existingItem), 1, item);
  }

  public async delete(id: string): Promise<void> {
    const existingItem = await this.findById(id);

    this.items.splice(this.items.indexOf(existingItem), 1);
  }
}
