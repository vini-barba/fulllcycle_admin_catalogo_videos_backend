import CategoryFactory from "../../../domain/factory/category.factory";
import CategoryInMemoryRepository from "../../../infra/repository/category.in-memory.repository";
import ListCategoryUseCase from "./list-category.use-case";

describe("List category use case", () => {
    let useCase: ListCategoryUseCase;
    let repository: CategoryInMemoryRepository;
    const category0 = CategoryFactory.create({
        id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
        name: 'Category 1',
        description: 'Category 1 description',
        isActive: true,
    });
    const category1 = CategoryFactory.create({
        id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
        name: 'Category 2',
        description: 'Category 2 description',
        isActive: true,
    });
    const category2 = CategoryFactory.create({
        id: 'e3c05239-63ce-4258-b93f-eab263dfbcab',
        name: 'Category 3',
        description: 'Category 3 description',
        isActive: true,
    });
    const category3 = CategoryFactory.create({
        id: 'e3c05239-63ce-4258-b93f-eab263dfbcac',
        name: 'Category 4',
        description: 'Category 4 description',
        isActive: true,
    });

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoryUseCase(repository);
    })

    it("should list categories", async () => {
        await repository.insert(category0);
        await repository.insert(category1);
        await repository.insert(category2);
        await repository.insert(category3);
        const output = await useCase.execute({});
        const categories = output.categories;
        expect(categories.length).toBe(4);
        expect(categories[0].id).toBe('e3c05239-63ce-4258-b93f-eab263dfbca9');
        expect(categories[1].id).toBe('e3c05239-63ce-4258-b93f-eab263dfbcaa');
        expect(categories[2].id).toBe('e3c05239-63ce-4258-b93f-eab263dfbcab');
        expect(categories[3].id).toBe('e3c05239-63ce-4258-b93f-eab263dfbcac');
    })

})