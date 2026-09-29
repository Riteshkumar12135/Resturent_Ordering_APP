import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, mobile, email, address, items, subtotal, tax, total } = body;
    if (!customerName || !mobile || !email || !address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "Please provide valid customer details and at least one item." }, { status: 400 });
    }
    const order = { id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, customerName, mobile, email, address, items, subtotal, tax, total, status: "Pending", createdAt: new Date().toISOString() };
    return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
