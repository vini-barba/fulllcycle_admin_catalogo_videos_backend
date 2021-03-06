import CategoryInterface, { CategoryProps } from "./category.interface";
import Entity from "../../../@shared/domain/entity/entity.abstract";
import CategoryValidatorFactory from "../factory/category.validator.factory";
import EntityValidationError from "../../../@shared/errors/validation.error";

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
    this.validate();
  }

  validate() {
    const validator = CategoryValidatorFactory.create();
    validator.validate(this);
    if (!validator.isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name(): string {
    return this._name;
  }

  private set name(_name: string) {
    this._name = _name;
    this.props.name =  this._name;
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
    this.props.description = this._description;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  private set isActive(_isActive: boolean) {
    if (_isActive !== undefined) {
      this._isActive = _isActive;
    }
    this.props.isActive = this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  private set createdAt(_createdAt: Date) {
    if (_createdAt !== undefined) {
      this._createdAt = _createdAt;
    }
    this.props.createdAt = this._createdAt;
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
    this.validate();
  }
}
