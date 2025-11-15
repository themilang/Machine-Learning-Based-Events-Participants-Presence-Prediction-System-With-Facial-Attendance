// app/api/overview/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();

    // Fetch all events, sorted by creation date descending (latest first)
    const events = await Event.find({})
      .sort({ createdAt: -1 }) // latest first
      .lean();

    // Map only required fields
    const overview = events.map((e) => ({
      title: e.title,
      createdAt: e.createdAt, // include for reference if needed
    }));

    return NextResponse.json({ success: true, overview });
  } catch (err: any) {
    console.error("❌ Overview fetch error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}