import GerenalSearchParams from "../../../@shared/domain/repository/searchable/params/search-params";
import GerenalSearchResult from "../../../@shared/domain/repository/searchable/result/search-result";
import SearchableRepositoryInterface from "../../../@shared/domain/repository/searchable/searchable-repository.interface";
import Category from "../entity/category";


export namespace CategoryRepository {
  export type Filter = string
  
  export class SearchParams extends GerenalSearchParams<Filter> { }
  
  export class SearchResult extends GerenalSearchResult<Category, Filter>{ }
  
  export  interface Interface
    extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> { }

}
export default CategoryRepository