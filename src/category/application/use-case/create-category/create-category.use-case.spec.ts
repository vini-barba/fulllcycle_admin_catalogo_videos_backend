import CategoryInMemoryRepository from '../../../infra/repository/category.in-memory.repository';
import CreateCategoryUseCase from './create-category.use-case';

describe('Create category use case', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    const input = {
      name: 'Category 1',
      description: 'Description 1',
      isActive: true,
    };
    const output = await useCase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.isActive).toBe(input.isActive);
    expect(output.createdAt).toBeDefined();
  });

  it('should persist the category', async () => {
    const input = {
      name: 'Category 1',
      description: 'Description 1',
      isActive: true,
    };
    const output = await useCase.execute(input);
    const category = await repository.findById(output.id);
    expect(category).toBeDefined();
    expect(category.name).toBe(input.name);
    expect(category.description).toBe(input.description);
    expect(category.isActive).toBe(input.isActive);
    expect(category.createdAt).toBeDefined();
  });

  it('should not create a category with invalid data', async () => {
    const input = {
      name: '',
      description: '',
      isActive: true,
    };
    await expect(useCase.execute(input)).rejects.toThrowError(
      'name: name should not be empty'
    );
  });
});
