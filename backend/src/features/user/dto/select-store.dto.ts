import { IsEmpty, IsString, IsUUID } from "class-validator";

export class SelectStoreDto {
    @IsString()
    @IsEmpty()
    @IsUUID()
    storeId: string;
}