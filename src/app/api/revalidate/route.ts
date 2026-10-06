import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    // Optional secret token check if SANITY_REVALIDATE_SECRET is configured
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the entire application layout instantly
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidated all pages successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
