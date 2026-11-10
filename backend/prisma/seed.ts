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
            username: "admin",
            password: "admin",
        },
    });

    const store = await prisma.store.upsert({
        where: { name: "Sindo Diesel" },
        update: {},
        create: {
            name: "Sindo Diesel",
        }
    });

    await prisma.storeAccess.upsert({
        where: {
            store_id: store.id,
            user_id: user.id
        },
        update: {},
        create: {
            store_id: store.id,
            user_id: user.id,
            userRole: UserRole.SUPERADMIN,
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

