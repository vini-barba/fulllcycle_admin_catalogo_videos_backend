import CategoryFactory from "../../../domain/factory/category.factory";
import CategoryInMemoryRepository from "../../../infra/repository/category.in-memory.repository";
import UpdateCategoryUseCase from "./update-category.use-case";
const category = CategoryFactory.create({
    id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
    name: 'Category 1',
    description: 'Category 1 description',
    isActive: true,
});
describe("Update category use case", () => {
    let useCase: UpdateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase(repository);
    })

    it("should update category", async () => {

        await repository.insert(category);
        const output = await useCase.execute({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
            name: 'Category 1 updated',
            description: 'Category 1 description updated',
            isActive: false,
            createdAt: category.createdAt,
        });

        const updatedCategory = await repository.findById('e3c05239-63ce-4258-b93f-eab263dfbca9');
        expect(updatedCategory.name).toBe('Category 1 updated');
        expect(updatedCategory.description).toBe('Category 1 description updated');
        expect(updatedCategory.isActive).toBe(false);
        expect(updatedCategory.createdAt).toBe(category.createdAt);

        expect(output.id).toBe('e3c05239-63ce-4258-b93f-eab263dfbca9');
        expect(output.name).toBe('Category 1 updated');
        expect(output.description).toBe('Category 1 description updated');
        expect(output.isActive).toBe(false);
        expect(output.createdAt).toBe(category.createdAt);
    })

    it("should update category, activating the category", async () => {
        const inactiveCategory = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
            name: 'Category 1',
            description: 'Category 1 description',
            isActive: false,
        });
        await repository.insert(inactiveCategory);
        const output = await useCase.execute({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
            name: 'Category 1 updated',
            description: 'Category 1 description updated',
            isActive: true,
            createdAt: inactiveCategory.createdAt,
        });
        expect(output.id).toBe('e3c05239-63ce-4258-b93f-eab263dfbcaa');
        expect(output.name).toBe('Category 1 updated');
        expect(output.description).toBe('Category 1 description updated');
        expect(output.isActive).toBe(true);
        expect(output.createdAt).toBe(inactiveCategory.createdAt);
    })


    it("should not update category", async () => {
        await repository.insert(category);

        await expect(
            useCase.execute({
                id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
                name: 'Category 1 updated',
                description: 'Category 1 description updated',
                isActive: false,
                createdAt: category.createdAt,
            })
        ).rejects.toThrowError("Item with id e3c05239-63ce-4258-b93f-eab263dfbcaa does not exist");
    })
})