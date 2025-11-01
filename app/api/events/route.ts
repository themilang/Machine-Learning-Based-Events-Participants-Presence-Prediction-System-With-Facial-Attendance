// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Event from "@/models/Event";

// // POST: Create Event
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const data = await req.json();
//     const newEvent = await Event.create(data);
//     return NextResponse.json({ success: true, event: newEvent });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, error: "Failed to create event" },
//       { status: 500 }
//     );
//   }
// }

// // GET: Fetch all Events
// export async function GET() {
//   try {
//     await connectDB();
//     const events = await Event.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(events);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch events" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

// POST: Create Event
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic validation
    if (!body.title || !body.date || !body.venue) {
      return NextResponse.json(
        { success: false, error: "Title, date, and venue are required." },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title: body.title,
      description: body.description || "",
      date: body.date,
      time: body.time || "",
      venue: body.venue,
      category: body.category || "",
      capacity: body.capacity || 0,
      organizer: body.organizer || "",
      contact: body.contact || "",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// GET: Fetch all Events
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}