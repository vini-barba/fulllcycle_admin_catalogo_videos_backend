namespace CreateCategoryDto {
  export interface Input {
    name: string;
    description?: string;
    isActive?: boolean;
  }

  export interface Output {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
  }
}

export default CreateCategoryDto;
