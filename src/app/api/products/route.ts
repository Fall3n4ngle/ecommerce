import { NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

export async function POST(request: Request) {
  const query = await request.json();
  console.log("query:", query);

  const products = await client.fetch(query ?? "");
  return NextResponse.json({ products });
}
