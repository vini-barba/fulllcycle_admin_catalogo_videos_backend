import UseCaseInterface from "../../../../@shared/application/use-case/use-case.interface";
import CategoryRepository from "../../../domain/repository/category-repository.interface";
import UpdateCategoryDto from "./update-category.dto";

export default class UpdateCategoryUseCase implements UseCaseInterface<UpdateCategoryDto.Input, UpdateCategoryDto.Output> {
    constructor(private readonly categoryRepository: CategoryRepository.Interface) { }
    async execute(input: UpdateCategoryDto.Input): Promise<UpdateCategoryDto.Output> {
        const category = await this.categoryRepository.findById(input.id);
        category.update(input.name, input.description);
        if (input.isActive === true) {
            category.activate();
        } 
        if(input.isActive === false) {
            category.deactivate();
        }
        await this.categoryRepository.update(category);
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            isActive: category.isActive,
            createdAt: category.createdAt,
        };
    }
}