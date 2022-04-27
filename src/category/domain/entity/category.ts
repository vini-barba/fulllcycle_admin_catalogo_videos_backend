import CategoryInterface, { CategoryProps } from "./category.interface";
import Entity from "../../../@shared/domain/entity/entity.abstract";

export default class Category
  extends Entity<CategoryProps>
  implements CategoryInterface
{
  private _name: string;
  private _description: string | null = null;
  private _isActive: boolean = true;
  private _createdAt: Date = new Date();

  constructor(props: CategoryProps) {
    super(props);
    this._name = props.name;
    this.description = props.description;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
  }

  get name(): string {
    return this._name;
  }

  private set name(_name: string) {
    this._name = _name;
  }

  get description(): string | null {
    return this._description;
  }

  private set description(_description: string | null) {
    if (_description !== undefined) {
      this._description = _description;
    } else {
      this._description = null;
    }
  }

  get isActive(): boolean {
    return this._isActive;
  }

  private set isActive(_isActive: boolean) {
    if (_isActive !== undefined) {
      this._isActive = _isActive;
    }
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  private set createdAt(_createdAt: Date) {
    if (_createdAt !== undefined) {
      this._createdAt = _createdAt;
    }
  }

  public activate() {
    this.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
  }

  public update(_name: string, _description: string): void {
    this.name = _name;
    this.description = _description;
  }
}
