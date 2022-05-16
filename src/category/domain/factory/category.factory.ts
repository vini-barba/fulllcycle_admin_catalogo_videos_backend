import { CategoryProps } from '../entity/category.interface';
import UniqueEntityId from '../../../@shared/domain/value-object/unique-entity-id/unique-entity-id';
import Category from '../entity/category';

export interface CategoryFactoryProps {
  id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export default class CategoryFactory {
  public static create(props: CategoryFactoryProps): Category {
    const uniqueEntityId = new UniqueEntityId(props.id);
    const id = uniqueEntityId.value;

    const categoryProps: CategoryProps = {
      id: id,
      name: props.name,
      description: props.description,
      isActive: props.isActive,
      createdAt: props.createdAt,
    };

    return new Category(categoryProps);
  }
}
