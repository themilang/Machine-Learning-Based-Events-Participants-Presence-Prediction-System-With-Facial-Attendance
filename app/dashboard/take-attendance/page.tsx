"use client";
import { useState, useEffect } from "react";

interface Event {
  _id: string;
  title: string;
  date: string;
}

export default function TakeAttendancePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events"); // your existing event API
        const data = await res.json();
        if (data.success) setEvents(data.events);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const startAttendance = async () => {
    if (!selectedEvent) {
      setMessage("⚠️ Please select an event first.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/start-attendance", {
        method: "POST",
        body: JSON.stringify({ event_id: selectedEvent }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Attendance process started. Check camera window.");
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Could not trigger attendance script.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-black">
      <h1 className="text-2xl font-semibold mb-6 text-black">Take Attendance</h1>

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

      <button
        onClick={startAttendance}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-black"
      >
        {loading ? "Starting..." : "Start Attendance"}
      </button>

      {message && <p className="mt-4 text-black">{message}</p>}
    </div>
  );
}