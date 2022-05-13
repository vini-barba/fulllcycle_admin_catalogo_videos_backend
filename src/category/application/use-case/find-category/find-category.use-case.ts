import UseCaseInterface from '../../../../@shared/application/use-case/use-case.interface';
import CategoryRepository from '../../../domain/repository/category-repository.interface';
import FindCategoryDto from './find-category.dto';

export default class FindCategoryUseCase implements UseCaseInterface<FindCategoryDto.Input, FindCategoryDto.Output> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Interface
  ) {}

  async execute(input: FindCategoryDto.Input): Promise<FindCategoryDto.Output> {
    const category = await this.categoryRepository.findById(input.id);
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}
