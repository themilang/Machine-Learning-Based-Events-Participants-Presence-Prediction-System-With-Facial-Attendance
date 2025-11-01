import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();

    // Convert eventId to ObjectId
    data.eventId = new mongoose.Types.ObjectId(data.eventId);

    // Convert last_event_attended to Date
    if (data.last_event_attended) data.last_event_attended = new Date(data.last_event_attended);

    const registration = await Registration.create(data);
    console.log("Saved registration:", registration);

    return NextResponse.json({ success: true, registration });
  } catch (err) {
    console.error("Error saving registration:", err);
    return NextResponse.json({ success: false, error: err });
  }
}