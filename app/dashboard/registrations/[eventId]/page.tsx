import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";

interface PageProps {
  params: { eventId: string } | Promise<{ eventId: string }>;
}

export default async function EventRegistrationsPage({ params }: PageProps) {
  const { eventId } = await params;
  await connectDB();

  const eventDoc: any = await Event.findById(eventId).lean();
  if (!eventDoc) return <p>Event not found.</p>;

  const registrations = await Registration.find({ eventId }).lean();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Registrations for {eventDoc.title}</h1>
      <p className="text-gray-700 mb-6">{eventDoc.description}</p>

      {registrations.length === 0 ? (
        <p className="text-gray-500">No visitors have registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Age</th>
                <th className="px-4 py-2 text-left">Occupation</th>
                <th className="px-4 py-2 text-left">District</th>
                <th className="px-4 py-2 text-left">Region</th>
                <th className="px-4 py-2 text-left">Urban</th>
                <th className="px-4 py-2 text-left">Ticket Type</th>
                <th className="px-4 py-2 text-left">Ticket Price</th>
                <th className="px-4 py-2 text-left">Will Attend</th>
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody>
              {registrations.map((r: any) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{r.full_name}</td>
                  <td className="px-4 py-2">{r.gender}</td>
                  <td className="px-4 py-2">{r.age}</td>
                  <td className="px-4 py-2">{r.occupation}</td>
                  <td className="px-4 py-2">{r.district}</td>
                  <td className="px-4 py-2">{r.region}</td>
                  <td className="px-4 py-2">{r.urban ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">{r.ticket_type}</td>
                  <td className="px-4 py-2">{r.ticket_price}</td>
                  <td className="px-4 py-2">{r.will_attend ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}