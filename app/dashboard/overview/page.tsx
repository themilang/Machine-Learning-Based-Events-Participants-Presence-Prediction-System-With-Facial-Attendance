// app/dashboard/overview/page.tsx
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// --- Type Definitions ---
interface EventOverview {
  _id: string;
  title: string;
  totalRegistered: number;
  totalAttendance: number;
}

const uri = process.env.MONGODB_URI!;
const attendanceDbName = process.env.MONGODB_DB || "attendance_db";

export default async function OverviewPage() {
  // --- Server-side fetch ---
  await connectDB();

  // Fetch all events sorted by creation date descending
  const events = await Event.find({})
    .sort({ createdAt: -1 })
    .lean();

  // Connect MongoDB for attendance
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(attendanceDbName);
  const attendanceCol = db.collection("attendance");

  const overview: EventOverview[] = [];

  for (const event of events) {
    const eventId = (event._id as mongoose.Types.ObjectId).toString();

    // Total registered
    const totalRegistered = await Registration.countDocuments({
      eventId: new mongoose.Types.ObjectId(eventId),
    });

    // Total attendance (unique user IDs)
    const attendanceRecords = await attendanceCol
      .find({ event_id: eventId })
      .toArray();
    const totalAttendance = new Set(attendanceRecords.map((a) => a.user_id)).size;

    overview.push({
      _id: eventId,
      title: event.title || "Untitled Event",
      totalRegistered,
      totalAttendance,
    });
  }

  await client.close();

  // --- Render ---
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event Overview</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">S.N.</th>
            <th className="border px-4 py-2">Event</th>
            <th className="border px-4 py-2">Total Registered</th>
            <th className="border px-4 py-2">Total Attendance</th>
          </tr>
        </thead>
        <tbody>
          {overview.map((event, index) => (
            <tr key={event._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{event.title}</td>
              <td className="border px-4 py-2">{event.totalRegistered}</td>
              <td className="border px-4 py-2">{event.totalAttendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}