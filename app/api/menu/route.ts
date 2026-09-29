import { NextResponse } from "next/server";
import { menu } from "@/data/menu";

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 250));
  return NextResponse.json({ items: menu });
}
