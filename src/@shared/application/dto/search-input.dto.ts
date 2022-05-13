import { SortDirection } from "../../domain/repository/searchable/params/search-params";

export default interface SearchInputDto<T = string> {
    page?: number;
    limit?: number;
    sort?: string;
    sortDir?: SortDirection;
    filter?: T | null;
}
