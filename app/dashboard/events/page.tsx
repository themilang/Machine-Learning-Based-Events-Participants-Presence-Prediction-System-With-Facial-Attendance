import ShareButton from "@/components/ShareButton";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export default async function EventsPage() {
  await connectDB();
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">Event List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event: any) => (
            <div
              key={event._id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col justify-between"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">{event.title}</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>
                <ul className="text-gray-600 space-y-4 text-sm">
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Time:</span>{" "}
                    {event.time || "-"}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Venue:</span> {event.venue}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Category:</span>{" "}
                    {event.category}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Capacity:</span>{" "}
                    {event.capacity}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Organizer:</span>{" "}
                    {event.organizer}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <span className="font-medium">Contact:</span> {event.contact}
                  </li>
                  <li className="pb-2">
                    <span className="font-medium">Notes:</span>{" "}
                    {event.notes || "-"}
                  </li>
                </ul>
              </div>
             <ShareButton eventId={event._id.toString()} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
}
