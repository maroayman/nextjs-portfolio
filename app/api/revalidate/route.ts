import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const secret = request.nextUrl.searchParams.get("secret")
    
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { success: false, message: "Invalid secret" },
        { status: 401 }
      )
    }

    // Parse the webhook payload (optional, for logging)
    let payload = null
    try {
      payload = await request.json()
      console.log("🔄 Hashnode webhook received:", payload?.event || "unknown event")
    } catch {
      // Payload might be empty for some webhook types
      console.log("🔄 Hashnode webhook received (no payload)")
    }

    // Revalidate the articles page
    revalidatePath("/articles")
    
    // Also revalidate the home page if articles are shown there
    revalidatePath("/")

    console.log("✅ Revalidation triggered successfully")

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: ["/articles", "/"],
    })
  } catch (error) {
    console.error("❌ Revalidation error:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

// Also support GET for manual testing (remove in production if desired)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { success: false, message: "Invalid secret" },
      { status: 401 }
    )
  }

  revalidatePath("/articles")
  revalidatePath("/")

  return NextResponse.json({
    success: true,
    revalidated: true,
    timestamp: new Date().toISOString(),
    message: "Manual revalidation triggered",
  })
}
