
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function clean() {
  console.log('Cleaning up duplicate tools...')
  
  // 1. Find the 'vpc_tool' if it exists and delete it
  const vpcTool = await prisma.roadmapTool.findUnique({
    where: { toolId: 'vpc_tool' }
  })
  
  if (vpcTool) {
    console.log('Found vpc_tool, deleting tasks and tool...')
    await prisma.roadmapTask.deleteMany({ where: { toolId: vpcTool.id } })
    await prisma.roadmapTool.delete({ where: { id: vpcTool.id } })
  }

  // 2. Ensure 'vpc' tool has the right name
  await prisma.roadmapTool.updateMany({
    where: { toolId: 'vpc' },
    data: { name: 'Value Proposition Canvas' }
  })

  console.log('Cleanup done.')
}

clean()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
