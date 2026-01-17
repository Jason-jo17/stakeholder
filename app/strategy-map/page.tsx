import { prisma } from '@/lib/prisma';
import StrategyMapClient from './StrategyMapClient';

export const dynamic = 'force-dynamic';

export default async function StrategyMapPage() {
    const problems = await prisma.problemStatement.findMany({
        take: 5,
        orderBy: { severity: 'desc' }
    });

    const solutions = await prisma.solution.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    const sectors = await prisma.sector.findMany({
        take: 5
    });

    return <StrategyMapClient problems={problems} solutions={solutions} sectors={sectors} />;
}
