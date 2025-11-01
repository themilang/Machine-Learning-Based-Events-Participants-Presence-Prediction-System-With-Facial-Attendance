import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import PredictClient from "./PredictClient";

export const dynamic = "force-dynamic";

export default async function PredictRegisteredPage() {
  await connectDB();
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();

  const eventsPlain = events.map((e: any) => ({
    ...e,
    _id: e._id.toString(),
    date: e.date ? new Date(e.date).toISOString() : null,
  }));

  return <PredictClient events={eventsPlain} />;
}