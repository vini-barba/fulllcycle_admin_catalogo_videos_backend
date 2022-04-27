import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import ValidatorClassValidator from "../../../@shared/domain/validator/validator.class-validator.abstract";
import { CategoryProps } from "../entity/category.interface";

export class CategoryRules {
  @IsString()
  @IsNotEmpty()
  id: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  createdAt: Date;
  constructor({ id, name, description, isActive, createdAt }: CategoryProps) {
    Object.assign(this, { id, name, description, isActive, createdAt });
  }
}

export default class CategoryClassValidatorValidator<
  CategoryRules
> extends ValidatorClassValidator<CategoryRules> {
  validate(entity: CategoryProps): void {
    super.validate(new CategoryRules(entity));
  }
}
