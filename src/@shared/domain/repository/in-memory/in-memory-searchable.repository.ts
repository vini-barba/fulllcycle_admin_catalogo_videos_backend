import Entity from "../../entity/entity.abstract";
import SearchParams from "../searchable/params/search-params";
import SearchResult, { SearchResultProps } from "../searchable/result/search-result";
import SearchableRepositoryInterface from "../searchable/searchable-repository.interface";
import InMemoryRepository from "./in-memory.repository";

export default abstract class InMemorySearchableRepository<
  T extends Entity,
  >
  extends InMemoryRepository<T>
  implements SearchableRepositoryInterface<T>
{
  sortableFields: string[];
  protected abstract applyFilter(items: T[], filter: SearchParams["filter"]): Promise<T[]>;
  protected async applySort(items: T[], sort: SearchParams["sort"], sortDir: SearchParams["sortDir"]): Promise<T[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === "asc" ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sortDir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }
  protected async applyPagination(items: T[], page: SearchParams["page"], limit: SearchParams["limit"]): Promise<T[]> {
    const start = (page - 1) * limit; 
    const offset = start + limit; 
    return items.slice(start, offset);
   }

  async search(props: SearchParams): Promise<SearchResult<T>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sortDir);
    const itemsPaged = await this.applyPagination(itemsSorted, props.page, props.limit);
    const resultProps: SearchResultProps<T, SearchParams["filter"]> = {
      items: itemsPaged,
      total: itemsFiltered.length,
      currentPage: props.page,
      limit: props.limit,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    };
    return new SearchResult(resultProps);
  }
}
