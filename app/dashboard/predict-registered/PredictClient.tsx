"use client";

import { useState } from "react";

export default function PredictClient({ events }: { events: any[] }) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    registrationId: string;
    will_attend: boolean;
    probability: number;
  } | null>(null);

  // Fetch all registrations for the selected event
  const fetchRegistrations = async (eventId: string) => {
    setSelectedEvent(eventId);
    setLoading(true);
    const res = await fetch(`/api/event-registrations?eventId=${eventId}`);
    const data = await res.json();
    setRegistrations(data.registrations);
    setLoading(false);
  };

  // Predict attendance for a specific registration
  const predictAttendance = async (registrationId: string) => {
    const res = await fetch("/api/predict-registered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });

    const result = await res.json();
    setPredictionResult({
      registrationId,
      will_attend: result.prediction?.will_attend,
      probability: result.prediction?.probability,
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Predict Attendance (Registered Users)</h1>

      {/* Event dropdown */}
      <select
        className="border p-2 rounded mb-6"
        value={selectedEvent}
        onChange={(e) => fetchRegistrations(e.target.value)}
      >
        <option value="">Select Event</option>
        {events.map((event: any) => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>

      {/* Registrations table */}
      {loading ? (
        <p>Loading registrations...</p>
      ) : registrations.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Predict</th>
              <th className="px-4 py-2 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{r.full_name}</td>
                <td className="px-4 py-2">{r.email || "-"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => predictAttendance(r._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Predict
                  </button>
                </td>
                <td className="px-4 py-2">
                  {predictionResult?.registrationId === r._id ? (
                    <span
                      className={`font-semibold ${
                        predictionResult.will_attend
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {predictionResult.will_attend ? "Will Attend" : "Won’t Attend"} (
                      {(predictionResult.probability * 100).toFixed(1)}%)
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedEvent && <p className="text-gray-500">No registrations found for this event.</p>
      )}
    </div>
  );
}