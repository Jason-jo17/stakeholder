
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tools = await prisma.roadmapTool.findMany({
    select: {
      toolId: true,
      name: true,
      stage: {
        select: {
          name: true
        }
      }
    }
  });
  console.log(JSON.stringify(tools, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
