import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

type ParsedBody = {
  _type: "product" | "size" | "color" | "category" | "showcaseProducts";
  slug: string;
  operation: "create" | "update" | "delete";
};

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<ParsedBody>(
      req,
      process.env.NEXT_PUBLIC_SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body) {
      return new Response("Bad Request", { status: 400 });
    }

    const { _type, slug, operation } = body;

    if (_type === "product" && operation === "update") {
      revalidateTag(slug);
    }

    revalidateTag(_type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error) {
    const message =
      (error as Error).message ?? "Failed to process sanity webhook";

    return new Response(message, { status: 500 });
  }
}
