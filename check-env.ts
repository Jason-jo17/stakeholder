import * as dotenv from 'dotenv';
dotenv.config();

console.log('--- Environment Check ---');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '(set)' : '(missing)');
console.log('--- End Check ---');
