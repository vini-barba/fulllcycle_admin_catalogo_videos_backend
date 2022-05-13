export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SearchProps<T = string> = {
  page?: number;
  limit?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: T | null;
};

export default class SearchParams<Filter =string> {
  protected _page: number = 1;
  protected _limit: number = 15;
  protected _sort: string | null = null;
  protected _sortDir: SortDirection | null = null;
  protected _filter: Filter | null = null;

  constructor(props: SearchProps<Filter> = {}) {
    this.page = props.page;
    this.limit = props.limit;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }
  get page(): number {
    return this._page;
  }
  private set page(_page: number) {
    const n = parseInt(_page as any);
    if (Number.isNaN(n) || _page <= 0 || n !== _page) {
      this._page = this._page;
    } else {
      this._page = _page;
    }
  }

  get limit(): number {
    return this._limit;
  }
  private set limit(_limit: number) {
    const n = parseInt(_limit as any);
    if (Number.isNaN(n) || _limit <= 0 || n !== _limit) {
      this._limit = this._limit;
    } else {
      this._limit = _limit;
    }
  }

  get sort(): string | null {
    return this._sort;
  }
  private set sort(_sort: string) {
    this._sort =
      _sort === null || _sort === undefined || _sort === "" ? null : `${_sort}`;
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }
  private set sortDir(_sortDir: SortDirection) {
    if (!this._sort) {
      this._sortDir = null;
    } else {
      const enumValues = Object.values(SortDirection).map((s) =>
        s.toString().toLowerCase()
      );
      const value = _sortDir?.toString()?.toLowerCase();
      this._sortDir = enumValues.includes(value)
        ? (value as SortDirection)
        : SortDirection.ASC;
    }
  }

  get filter(): Filter | null {
    return this._filter;
  }
  private set filter(_filter: Filter | null) {
    const value = _filter as unknown 
    this._filter =
      _filter !== null && _filter !== undefined && value !== ""
        ? `${value}` as unknown as Filter
        : null;
  }
}
