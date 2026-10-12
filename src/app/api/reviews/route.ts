import { NextResponse } from "next/server";
import { addReview, listReviews } from "../../lib/reviews";

export async function GET() {
  return NextResponse.json(await listReviews());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The review could not be read." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "The review could not be read." }, { status: 400 });
  }

  const data = body as {
    name?: string;
    rating?: number;
    comment?: string;
    company?: string;
  };
  if (data.company) {
    return NextResponse.json({ dropped: true });
  }

  try {
    const result = await addReview({
      name: data.name ?? "",
      rating: Number(data.rating),
      comment: data.comment ?? "",
    });
    if ("error" in result) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "The review could not be saved." }, { status: 500 });
  }
}
