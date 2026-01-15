
import { prisma } from './lib/prisma'
import { STAKEHOLDER_DATA } from './lib/data/stakeholders-data'
import { hash } from 'bcryptjs'

async function main() {
    console.log('Starting debug seed for STK_250...');
    const stk = STAKEHOLDER_DATA.stakeholders.find(s => s.id === 'STK_250');

    if (!stk) {
        console.error('STK_250 not found in data!');
        return;
    }

    console.log('Found STK_250:', stk.name);

    const stkData = stk as any;
    try {
        const passwordHash = await hash('password', 10);
        const email = stkData.email || `${stk.id.toLowerCase()}@example.com`;

        console.log(`Upserting User: ${email}...`);
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name: stk.name,
                phone: stkData.phone,
            },
            create: {
                email,
                name: stk.name,
                role: 'STAKEHOLDER',
                phone: stkData.phone,
                passwordHash
            }
        });
        console.log('User upserted:', user.id);

        console.log('Upserting Profile...');
        // Mock sectors/problems for debug
        await prisma.stakeholderProfile.upsert({
            where: { userId: user.id },
            update: {
                designation: stk.designation,
                organization: stk.organization,
                district: stk.district,
            },
            create: {
                userId: user.id,
                designation: stk.designation,
                organization: stk.organization,
                district: stk.district,
                verificationStatus: 'verified' // Manual override
            }
        });
        console.log('Profile upserted successfully!');

    } catch (e) {
        console.error('ERROR SEEDING STK_250:');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
