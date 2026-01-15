
try {
    const { PrismaClient } = require('@prisma/client');
    console.log('Client imported successfully');
    const prisma = new PrismaClient();
    console.log('Client instantiated');
} catch (e) {
    console.error('Failed:', e);
}
