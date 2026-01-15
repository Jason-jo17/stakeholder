import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const input = await req.json()

    // Mock response
    return NextResponse.json({
        success: true,
        id: "report-123",
        message: "Report generated successfully"
    })
}
