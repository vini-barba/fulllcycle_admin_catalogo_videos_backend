import Category from "../entity/category";
import CategoryClassValidatorValidator from "../validator/category.class-validator.validator";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";

export default class CategoryValidatorFactory {
  public static create(): ValidatorInterface<Category> {
    return new CategoryClassValidatorValidator();
  }
}
