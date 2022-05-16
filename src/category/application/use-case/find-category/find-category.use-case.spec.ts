import CategoryFactory from '../../../domain/factory/category.factory';
import CategoryInMemoryRepository from '../../../infra/repository/category.in-memory.repository';
import FindCategoryUseCase from './find-category.use-case';

describe('Find category use case', () => {
  let useCase: FindCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new FindCategoryUseCase(repository);
  });

  it('should find category', async () => {
    const uuid = 'e3c05239-63ce-4258-b93f-eab263dfbca9';
    const categoryTest = CategoryFactory.create({
      id: uuid,
      name: 'Category 1',
      description: 'Category 1 description',
      isActive: true,
    });
    await repository.insert(categoryTest);

    const category = await useCase.execute({
      id: uuid,
    });
    expect(category.id).toBe(uuid);
    expect(category.name).toBe('Category 1');
    expect(category.description).toBe('Category 1 description');
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it('should not find category', async () => {
    await expect(
      useCase.execute({
        id: '2',
      })
    ).rejects.toThrowError('Item with id 2 does not exist');
  });
});
