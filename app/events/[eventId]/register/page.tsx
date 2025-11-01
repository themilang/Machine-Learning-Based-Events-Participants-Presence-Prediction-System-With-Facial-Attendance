import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import ClientEventForm from "./ClientEventForm";
import { EventType } from "@/types/event";

interface PageProps {
  params: { eventId: string } | Promise<{ eventId: string }>;
}

export default async function EventRegisterPage(props: PageProps) {
  const { params } = props;
  const { eventId } = await params;

  await connectDB();

  // Use any for lean() result to avoid type issues
  const eventDoc: any | null = await Event.findById(eventId).lean();

  if (!eventDoc) return <p>Event not found</p>;

  // Convert _id and Dates to strings
  const event: EventType = {
    ...eventDoc,
    _id: eventDoc._id.toString(),
    date: eventDoc.date ? new Date(eventDoc.date).toISOString() : null,
    createdAt: eventDoc.createdAt ? new Date(eventDoc.createdAt).toISOString() : null,
    updatedAt: eventDoc.updatedAt ? new Date(eventDoc.updatedAt).toISOString() : null,
  };

  return <ClientEventForm event={event} />;
}