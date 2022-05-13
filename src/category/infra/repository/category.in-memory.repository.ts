import InMemorySearchableRepository from "../../../@shared/domain/repository/in-memory/in-memory-searchable.repository";
import { SortDirection } from "../../../@shared/domain/repository/searchable/params/search-params";
import Category from "../../domain/entity/category";
import CategoryRepository from "../../domain/repository/category-repository.interface";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Interface {
    sortableFields: string[];
    constructor(){
        super()
        this.sortableFields = ["name", "createdAt"]
    }
    protected async applyFilter(items: Category[], filter: CategoryRepository.SearchParams["filter"]): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }
  protected applySort(items: Category[], sort: string, sortDir: SortDirection): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "createdAt", sortDir);
    }
    return super.applySort(items, sort, sortDir);
  }
}
