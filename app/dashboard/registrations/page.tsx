import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import Link from "next/link";

export default async function DashboardRegistrations() {
  await connectDB();

  // Fetch all events
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();
  const eventsPlain = events.map((e: any) => ({
    ...e,
    _id: e._id.toString(),
    date: e.date ? new Date(e.date).toISOString() : null,
  }));

  // Total registrations
  const totalRegistrations = await Registration.countDocuments({});

  // Registrations per event
  const registrationsPerEventRaw = await Registration.aggregate([
    { $group: { _id: "$eventId", count: { $sum: 1 } } }
  ]);
  const registrationsPerEvent = registrationsPerEventRaw.reduce(
    (acc: any, cur: any) => ({ ...acc, [cur._id.toString()]: cur.count }),
    {}
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Registrations Dashboard</h1>

      {/* Dashboard summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Total Events</h2>
          <p className="text-2xl font-bold">{eventsPlain.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Total Registrations</h2>
          <p className="text-2xl font-bold">{totalRegistrations}</p>
        </div>

        {/* Example: Average registration per event */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Avg Registrations/Event</h2>
          <p className="text-2xl font-bold">
            {eventsPlain.length > 0
              ? Math.round(totalRegistrations / eventsPlain.length)
              : 0}
          </p>
        </div>

        {/* Example: Event with most registrations */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Top Event Registrations</h2>
          {(() => {
            const topEventRegistrations =
              eventsPlain.length > 0
                ? Math.max(...Object.values(registrationsPerEvent).map(v => Number(v)))
                : 0;
            return <p className="text-2xl font-bold">{topEventRegistrations}</p>;
          })()}
        </div>
      </div>

      {/* Events list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsPlain.map((event: any) => (
          <div key={event._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "-"} |{" "}
              <strong>Venue:</strong> {event.venue || "-"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Registrations:</strong> {registrationsPerEvent[event._id] || 0}
            </p>
            <Link
              href={`/dashboard/registrations/${event._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Registrations
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}