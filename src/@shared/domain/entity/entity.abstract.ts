export default abstract class Entity<T extends { id: string }> {
  protected _id: string;

  protected readonly props: T;
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
