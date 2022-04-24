export type CategoryProps = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export default interface CategoryInterface {
  get id(): string;
  get name(): string;
  get description(): string | null;
  get isActive(): boolean;
  get createdAt(): Date;
}
