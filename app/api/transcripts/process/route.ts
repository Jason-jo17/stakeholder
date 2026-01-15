import { NextRequest, NextResponse } from "next/server"

// Mock Route
export async function POST(req: NextRequest) {
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await req.json()
    const { transcriptId } = body

    // Simulation
    return NextResponse.json({ success: true, message: "Processing started", transcriptId })
}
