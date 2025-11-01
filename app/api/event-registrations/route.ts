//for prediting registered persons participation
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);
  const eventId = url.searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ success: false, error: "Missing eventId" });
  }

  const registrations = await Registration.find({ eventId }).lean();
  const registrationsPlain = registrations.map((r: any) => ({
    ...r,
    _id: r._id.toString(),
  }));

  return NextResponse.json({ success: true, registrations: registrationsPlain });
}