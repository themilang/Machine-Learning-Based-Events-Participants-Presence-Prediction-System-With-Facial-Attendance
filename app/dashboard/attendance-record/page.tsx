"use client";
import { useEffect, useState } from "react";

type Attendance = {
  _id: string;
  user_id: string;
  name: string;
  date: string;
  time: string;
  type: string;
  event_id: string;
};

type Event = {
  _id: string;
  title: string;
  date: string;
};

export default function AttendancePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all events for the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) setEvents(data.events);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // Fetch attendance when event changes
  useEffect(() => {
    if (!selectedEvent) {
      setRecords([]);
      return;
    }

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/attendance-record?event_id=${selectedEvent}`);
        const data = await res.json();
        setRecords(data.records || []); // assuming API returns { records: [...] }
      } catch (err) {
        console.error(err);
        setRecords([]);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [selectedEvent]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-black">Attendance Records</h1>

      {/* Event selector */}
      <select
        className="mb-4 px-4 py-2 border rounded-md text-black"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="" className="text-black">-- Select Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id} className="text-black">
            {event.title} ({new Date(event.date).toLocaleDateString()})
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center mt-10 text-black">Loading attendance...</p>
      ) : records.length === 0 ? (
        <p className="text-center mt-4 text-black">No attendance records for this event.</p>
      ) : (
        <table className="min-w-full border border-gray-300 mt-4 text-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border text-black">User ID</th>
              <th className="p-2 border text-black">Name</th>
              <th className="p-2 border text-black">Date</th>
              <th className="p-2 border text-black">Time</th>
              <th className="p-2 border text-black">Type</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="text-center text-black">
                <td className="border p-2 text-black">{r.user_id}</td>
                <td className="border p-2 text-black">{r.name}</td>
                <td className="border p-2 text-black">{r.date}</td>
                <td className="border p-2 text-black">{r.time}</td>
                <td className="border p-2 text-black">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}