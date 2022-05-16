
export default interface SearchOutputDto<T, U> {
    items: T[];
    total: number;
    current_page: number;
    limit: number;
    last_page: number;
}
