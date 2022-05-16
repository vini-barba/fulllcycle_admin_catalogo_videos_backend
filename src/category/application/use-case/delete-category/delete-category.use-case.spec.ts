import CategoryFactory from "../../../domain/factory/category.factory";
import CategoryInMemoryRepository from "../../../infra/repository/category.in-memory.repository";
import DeleteCategoryUseCase from "./delete.category.use-case";

const category = CategoryFactory.create({
    id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
    name: 'Category 1',
    description: 'Category 1 description',
    isActive: true,
});
describe("delete category use case", () => {
    let useCase: DeleteCategoryUseCase;
    let repository: CategoryInMemoryRepository;
    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase(repository);
    })

    it("should delete category", async () => {
        await repository.insert(category);
        const output = await useCase.execute({
            id: category.id,
        });
        expect(output.message).toBe(`Category with id ${category.id} has been deleted`);

        await expect(() => repository.findById(category.id)).rejects.toThrow(`Item with id ${category.id} does not exist`);
    })

    it("should not delete category, because it does not exist", async () => {
        await expect(() => useCase.execute({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
        })).rejects.toThrow(`Item with id e3c05239-63ce-4258-b93f-eab263dfbca9 does not exist`);
    })
})