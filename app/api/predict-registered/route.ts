import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const registrationsData = await Registration.find({}).lean();
    const eventsData = await Event.find({}).lean();

    const eventMap: Record<string, string> = {};
    eventsData.forEach((e: any) => {
      eventMap[e._id.toString()] = e.title;
    });

    const registrations = registrationsData.map((r: any) => ({
      ...r,
      _id: r._id.toString(),
      eventId: r.eventId.toString(),
    }));

    return NextResponse.json({ registrations, eventMap });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}