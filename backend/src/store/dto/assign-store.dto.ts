import { UserRole } from '../../generated/prisma/enums.js';

export class AssignStoreDto {
    storeId: string;
    users: {
        userId: string;
        role: UserRole;
    }[];
}
