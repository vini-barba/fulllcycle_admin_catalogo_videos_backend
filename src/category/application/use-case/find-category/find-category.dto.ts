namespace FindCategoryDto {
  export interface Input {
    id: string;
  }

  export interface Output {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
  }
}

export default FindCategoryDto;
