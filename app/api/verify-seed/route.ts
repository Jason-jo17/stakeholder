import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const count = await prisma.stakeholderProfile.count();
        const stk250 = await prisma.stakeholderProfile.findUnique({
            where: { id: 'STK_250' },
            include: { user: true }
        });
        return NextResponse.json({
            success: true,
            count,
            stk250_exists: !!stk250,
            stk250_data: stk250 ? { name: stk250.user.name, organization: stk250.organization } : null
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
