import Entity from "../entity/entity.abstract";

export default interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
