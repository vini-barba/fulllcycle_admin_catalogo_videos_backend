import SearchInputDto from "../../../../@shared/application/dto/search-input.dto";
import SearchOutputDto from "../../../../@shared/application/dto/search-output.dto";
import CategoryRepository from "../../../domain/repository/category-repository.interface";

namespace SearchCategoryDto {
    export interface Input extends SearchInputDto<CategoryRepository.Filter> { }

    export interface Output extends SearchOutputDto<CategoryDto, CategoryRepository.Filter> { }

    export type CategoryDto = {
        id: string;
        name: string;
        description: string;
        isActive: boolean;
    }
}

export default SearchCategoryDto;
