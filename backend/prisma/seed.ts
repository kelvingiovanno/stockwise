import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    
    const user = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create : {
            name: "admin",
            code: "USER-1",
            role: "SUPERADMIN",
            username: "admin",
            password: "admin",
        },
    });

    const store = await prisma.store.upsert({
        where: { name: "Sindo Diesel" },
        update: {},
        create: {
            name: "Sindo Diesel",
            code: "STORE-1",
        }
    });

    await prisma.storeAccess.upsert({
        where: {
            storeId: store.id,
            userId: user.id
        },
        update: {},
        create: {
            storeId: store.id,
            userId: user.id,
            userRole: UserRole.ADMIN,
        }
    });

};

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });

