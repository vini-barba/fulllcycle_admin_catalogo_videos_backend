import CategoryFactory from "../../../domain/factory/category.factory";
import CategoryInMemoryRepository from "../../../infra/repository/category.in-memory.repository";
import SearchCategoryDto from "./search-category.dto";
import SearchCategoryUseCase from "./search-category.use-case";

describe("Search Category use case", () => {
    let useCase: SearchCategoryUseCase;
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
        useCase = new SearchCategoryUseCase(repository);
    })

    it("should search categories", async () => {
        await repository.insert(category0);
        await repository.insert(category1);
        await repository.insert(category2);
        await repository.insert(category3);

        const input0 = {
            filter: 'Category',
            limit: 10,
            sort: 'name',
            sortDir: 'asc',
            currentPage: 1,
        } as SearchCategoryDto.Input
        const output0 = await useCase.execute(input0);
        expect(output0.items.length).toBe(4);

        const input1 = {
            filter: 'Category',
            limit: 1,
            sort: 'name',
            sortDir: 'asc',
            currentPage: 1,
        } as SearchCategoryDto.Input
        const output1 = await useCase.execute(input1);
        expect(output1.items.length).toBe(1);
        expect(output1.items[0].name).toBe('Category 1');

        const input2 = {
            filter: '4',
            limit: 10,
            sort: 'name',
            sortDir: 'desc',
            currentPage: 1,
        } as SearchCategoryDto.Input
        const output2 = await useCase.execute(input2);
        expect(output2.items.length).toBe(1);
        expect(output2.items[0].name).toBe('Category 4');
        expect(output2.items[0].id).toBe('e3c05239-63ce-4258-b93f-eab263dfbcac');

        const input3 = {
            filter: 'Category',
            limit: 1,
            sort: 'name',
            sortDir: 'desc',
            currentPage: 1,
        } as SearchCategoryDto.Input
        const output3 = await useCase.execute(input3);
        expect(output3.items.length).toBe(1);
        expect(output3.items[0].name).toBe('Category 4');

    })

    it("should returns output using empty input with categories ordered by created_at", async () => {
        const categoryT0 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
            name: "test 1",
            description: 'Category 1 description',
            isActive: true,
        });
        const categoryT1 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
            name: "test 2",
            description: 'Category 2 description',
            isActive: true,
            createdAt: new Date(new Date().getTime() + 1000),
        });

        await repository.insert(categoryT0);
        await repository.insert(categoryT1);
        const items = [
            categoryT0,
            categoryT1,
        ]
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map((i) => {
                delete i.props.createdAt;
                return i.toJSON()
            }),
            total: 2,
            current_page: 1,
            limit: 15,
            last_page: 1,
        });
    });

    it("should returns output using pagination, sort and filter", async () => {
        const categoryT0 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbca9',
            name: "a",
            description: 'Category 1 description',
            isActive: true,
        });
        const categoryT1 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcaa',
            name: "AAA",
            description: 'Category 2 description',
            isActive: true,
        });
        const categoryT2 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcba',
            name: "AaA",
            description: 'Category 2 description',
            isActive: true,
        });
        const categoryT3 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcab',
            name: "b",
            description: 'Category 3 description',
            isActive: true,
        });
        const categoryT4 = CategoryFactory.create({
            id: 'e3c05239-63ce-4258-b93f-eab263dfbcac',
            name: "c",
            description: 'Category 4 description',
            isActive: true,
        });

        await repository.insert(categoryT0);
        await repository.insert(categoryT1);
        await repository.insert(categoryT2);
        await repository.insert(categoryT3);
        await repository.insert(categoryT4)

        const items = [
            categoryT0,
            categoryT1,
            categoryT2,
            categoryT3,
            categoryT4
        ].map(i =>{
            delete i.props.createdAt
            return i
        }); 

        let output = await useCase.execute({
            page: 1,
            limit: 2,
            sort: "name",
            filter: "a",
        });
        
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            limit: 2,
            last_page: 2,
        });

        output = await useCase.execute({
            page: 2,
            limit: 2,
            sort: "name",
            filter: "a",
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            limit: 2,
            last_page: 2,
        });

        output = await useCase.execute({
            page: 1,
            limit: 2,
            sort: "name",
            sortDir: 'desc',
            filter: "a",
        } as SearchCategoryDto.Input)
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            limit: 2,
            last_page: 2,
        });
    })
})