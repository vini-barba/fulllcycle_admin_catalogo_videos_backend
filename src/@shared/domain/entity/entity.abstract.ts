import EntityInterface from "./entity.interface";

export default abstract class Entity<T extends { id: string } = any>
  implements EntityInterface<T>
{
  protected _id: string;

  props: T;
  constructor(props: T) {
    this.props = props;
    this._id = props.id;
  }

  public get id(): string {
    return this._id;
  }

  toJSON = (): Required<T> => {
    return {
      ...this.props,
    } as Required<T>;
  };
}
