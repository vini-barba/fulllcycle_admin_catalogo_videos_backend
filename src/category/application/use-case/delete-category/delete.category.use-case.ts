import UseCaseInterface from "../../../../@shared/application/use-case/use-case.interface";
import CategoryRepository from "../../../domain/repository/category-repository.interface";
import DeleteCategoryDto from "./delete-category.dto";

export default class DeleteCategoryUseCase implements UseCaseInterface<DeleteCategoryDto.Input, DeleteCategoryDto.Output> {
    constructor(private readonly categoryRepository: CategoryRepository.Interface) { }
    async execute(input: DeleteCategoryDto.Input): Promise<DeleteCategoryDto.Output> {
        const category = await this.categoryRepository.findById(input.id);
        await this.categoryRepository.delete(category.id);
        return { message: `Category with id ${category.id} has been deleted` };
    }
}