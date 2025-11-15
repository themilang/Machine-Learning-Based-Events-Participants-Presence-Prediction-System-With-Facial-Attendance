import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "attendance_db";

export async function GET(req: Request) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("attendance");

    // Get event_id from query params
    const url = new URL(req.url);
    const eventId = url.searchParams.get("event_id");

    // Build query
    const query = eventId ? { event_id: eventId } : {};

    // Fetch records filtered by event_id (if provided)
    const records = await collection.find(query).sort({ timestamp: -1 }).toArray();

    // Serialize MongoDB ObjectId and timestamp
    const serialized = records.map((r) => ({
      _id: r._id.toString(),
      user_id: r.user_id,
      name: r.name,
      date: r.date,
      time: r.time,
      type: r.type,
      event_id: r.event_id,
      timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : r.timestamp,
    }));

    return NextResponse.json({ success: true, records: serialized });
  } catch (err: any) {
    console.error("❌ Fetch error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.close();
  }
}