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
  if (!eventDoc) return <p className="text-black">Event not found.</p>;

  const registrations = await Registration.find({ eventId }).lean();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-black">Registrations for {eventDoc.title}</h1>
      <p className="text-black mb-6">{eventDoc.description}</p>

      {registrations.length === 0 ? (
        <p className="text-black">No visitors have registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-black">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="px-4 py-2 text-left text-black">Full Name</th>
                <th className="px-4 py-2 text-left text-black">Gender</th>
                <th className="px-4 py-2 text-left text-black">Age</th>
                <th className="px-4 py-2 text-left text-black">Occupation</th>
                <th className="px-4 py-2 text-left text-black">District</th>
                    {/* <th className="px-4 py-2 text-left text-black">Region</th> */}
                <th className="px-4 py-2 text-left text-black">Urban</th>
                {/* <th className="px-4 py-2 text-left text-black">Ticket Type</th> */}
                {/* <th className="px-4 py-2 text-left text-black">Ticket Price</th> */}
                <th className="px-4 py-2 text-left text-black">Will Attend</th>
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody className="text-black">
              {registrations.map((r: any) => (
                <tr key={r._id} className="border-b hover:bg-gray-50 text-black">
                  <td className="px-4 py-2 text-black">{r.full_name}</td>
                  <td className="px-4 py-2 text-black">{r.gender}</td>
                  <td className="px-4 py-2 text-black">{r.age}</td>
                  <td className="px-4 py-2 text-black">{r.occupation}</td>
                  <td className="px-4 py-2 text-black">{r.district}</td>
                {/*  <td className="px-4 py-2 text-black">{r.region}</td> */}
                  <td className="px-4 py-2 text-black">{r.urban ? "Yes" : "No"}</td>
                       {/*  <td className="px-4 py-2 text-black">{r.ticket_type}</td>     */} 
                      {/*  <td className="px-4 py-2 text-black">{r.ticket_price}</td> */}
                  <td className="px-4 py-2 text-black">{r.will_attend ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}