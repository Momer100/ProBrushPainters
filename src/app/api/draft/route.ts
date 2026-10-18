import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // The secret is OPTIONAL. It's only enforced if SANITY_PREVIEW_SECRET is set in the
  // environment — so preview works out of the box with no extra config. Set the env var
  // later if you want to lock preview down.
  const expected = process.env.SANITY_PREVIEW_SECRET;
  if (expected && secret !== expected) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Redirect to the requested page. A value starting with "/" is used as-is (preview
  // any page, e.g. /services/interior-painting/); a bare value is treated as a blog
  // slug for backwards compatibility; nothing → home page.
  const dest = slug ? (slug.startsWith("/") ? slug : `/blog/${slug}`) : "/";
  redirect(dest);
}
