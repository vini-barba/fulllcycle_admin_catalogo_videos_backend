import UseCaseInterface from '../../../../@shared/application/use-case/use-case.interface';
import CategoryFactory from '../../../domain/factory/category.factory';
import CategoryRepository from '../../../domain/repository/category-repository.interface';
import CreateCategoryDto from './create-category.dto';

export default class CreateCategoryUseCase implements UseCaseInterface<CreateCategoryDto.Input, CreateCategoryDto.Output> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Interface
  ) { }

  async execute(
    input: CreateCategoryDto.Input
  ): Promise<CreateCategoryDto.Output> {
    const category = CategoryFactory.create(input);
    await this.categoryRepository.insert(category);
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}
