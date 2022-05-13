namespace ListCategoryDto {
    export interface Input {
    }
    
    export interface Output {
        categories: CategoryDto[];
    }

    export type CategoryDto = {
        id: string;
        name: string;
        description: string;
        isActive: boolean;
    }
  }
  
  export default ListCategoryDto;
  