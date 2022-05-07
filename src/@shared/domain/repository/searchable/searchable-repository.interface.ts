import Entity from "../../entity/entity.abstract";
import RepositoryInterface from "../repository.interface";
import SearchParams from "./params/search-params";
import SearchResult from "./result/search-result";

export default interface SearchableRepositoryInterface<
  T extends Entity,
  Filter = string,
  V = SearchParams<Filter>,
  X = SearchResult<T, Filter>
  > extends RepositoryInterface<T> {
  sortableFields: string[];
  search(props: V): Promise<X>;
}
