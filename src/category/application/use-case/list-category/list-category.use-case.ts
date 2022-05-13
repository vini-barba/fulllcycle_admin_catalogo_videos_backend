import UseCaseInterface from "../../../../@shared/application/use-case/use-case.interface";
import CategoryInterface from "../../../domain/entity/category.interface";
import CategoryRepository from "../../../domain/repository/category-repository.interface";
import ListCategoryDto from "./list-category.dto";

export default class ListCategoryUseCase implements UseCaseInterface<ListCategoryDto.Input, ListCategoryDto.Output> {
    constructor(private repository: CategoryRepository.Interface) { }

    async execute(input: ListCategoryDto.Input): Promise<ListCategoryDto.Output> {
        const categories = await this.repository.findAll();
        return OutputMapper.toOutput(categories);
    }

}
class OutputMapper {
    static toOutput(category: CategoryInterface[]): ListCategoryDto.Output {
        const categories: ListCategoryDto.CategoryDto[] = category.map(category => {
            return {
                id: category.id,
                name: category.name,
                description: category.description,
                isActive: category.isActive,
            }
        });
        return { categories };
    }
}