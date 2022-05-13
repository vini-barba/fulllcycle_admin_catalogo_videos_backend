namespace UpdateCategoryDto {
    export interface Input {
        id: string;
        name: string;
        description: string;
        isActive: boolean;
        createdAt: Date;
    }

    export interface Output {
        id: string;
        name: string;
        description: string;
        isActive: boolean;
        createdAt: Date;
    }

}

export default UpdateCategoryDto;
