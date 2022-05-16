import UseCaseInterface from "../../../../@shared/application/use-case/use-case.interface";
import { CategoryRepository } from "../../../domain/repository/category-repository.interface";
import SearchCategoryDto from "./search-category.dto";

export default class SearchCategoryUseCase implements UseCaseInterface<SearchCategoryDto.Input, SearchCategoryDto.Output>{
    constructor(private repository: CategoryRepository.Interface) { }

    async execute(input: SearchCategoryDto.Input): Promise<SearchCategoryDto.Output> {
        const params = new CategoryRepository.SearchParams(input)
        const categories = await this.repository.search(params);
        return OutputMapper.toOutput(categories);
    }
}
class OutputMapper {
    static toOutput(searchResult: CategoryRepository.SearchResult): SearchCategoryDto.Output {
        const categories: SearchCategoryDto.CategoryDto[] = searchResult.items.map(category => {
            return {
                id: category.id,
                name: category.name,
                description: category.description,
                isActive: category.isActive,
            }
        });
        return {
            items: categories,
            total: searchResult.total,
            current_page: searchResult.currentPage,
            limit: searchResult.limit,
            last_page: searchResult.lastPage,
        }
    }
}