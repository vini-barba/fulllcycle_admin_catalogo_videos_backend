import Entity from "../../../entity/entity.abstract";

export type SearchResultProps<T extends Entity, U> = {
  items: T[];
  total: number;
  currentPage: number;
  limit: number;
  sort: string | null;
  sortDir: string | null;
  filter: U | null;
};

export default class SearchResult<T extends Entity, U = string> {
  readonly items: T[];
  readonly total: number;
  readonly currentPage: number;
  readonly limit: number;
  readonly lastPage: number;
  readonly sort: string | null;
  readonly sortDir: string | null;
  readonly filter: U;

  constructor(parameters: SearchResultProps<T, U>) {
    this.items = parameters.items;
    this.total = parameters.total;
    this.limit = parameters.limit;
    this.currentPage = parameters.currentPage;
    this.lastPage = Math.ceil(this.total / this.limit);
    this.sort = parameters.sort ?? null;
    this.sortDir = parameters.sortDir ?? null;
    this.filter = parameters.filter ?? null;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.currentPage,
      limit: this.limit,
      last_page: this.lastPage,
      sort: this.sort,
      sort_dir: this.sortDir,
      filter: this.filter,
    };
  }
}
