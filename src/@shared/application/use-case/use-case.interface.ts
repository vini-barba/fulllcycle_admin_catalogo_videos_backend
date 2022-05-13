export default interface UseCaseInterface<T, U> {
    execute(input: T): U | Promise<U>;
}