
import dotenv from "dotenv";
import { join } from "path";

// Force load .env from the current directory and OVERRIDE system variables
// This fixes the 'localhost' poisoning issue
const envPath = join(__dirname, ".env");
dotenv.config({ path: envPath, override: true });

console.log("Prisma Config Loading. Host:", process.env["DATABASE_URL"]?.split('@')[1]);

export default {
    datasource: {
        url: process.env["DATABASE_URL"],
    },
};
