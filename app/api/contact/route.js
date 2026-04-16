import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, requirement, message } = body || {};

    if (!name || !email || !phone || !requirement || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      received: { name, company, email, phone, requirement, message }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process form." }, { status: 500 });
  }
}