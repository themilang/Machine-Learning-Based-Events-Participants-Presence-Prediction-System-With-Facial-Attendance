"use client";

import { useState } from "react";

// Update the type to match the output of the Python API
type PredictionResult = {
    registrationId: string;
    will_attend: boolean;
    probability_present: number; // Updated field name
    probability_absent: number; // New field
}

export default function PredictClient({ events }: { events: any[] }) {
  // --- MISSING STATE VARIABLES DECLARED ---
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // --- MISSING FUNCTION DECLARED ---
  // Fetch all registrations for the selected event (Function body from your previous steps)
  const fetchRegistrations = async (eventId: string) => {
    setSelectedEvent(eventId);
    setLoading(true);
    setRegistrations([]); // Clear previous registrations
    
    // NOTE: Ensure your Next.js API route /api/event-registrations is working
    const res = await fetch(`/api/event-registrations?eventId=${eventId}`);
    const data = await res.json();
    
    // Assuming data.registrations is the correct array path
    setRegistrations(data.registrations || []); 
    setLoading(false);
  };

  // Predict attendance for a specific registration
  const predictAttendance = async (registrationId: string) => {
    setLoading(true); // Set loading while predicting
    setPredictionResult(null); // Clear previous result
    
    const res = await fetch("/api/predict-registered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });

    const result = await res.json();
    setLoading(false); // End loading

    if (result.success) {
        setPredictionResult({
            registrationId,
            will_attend: result.prediction.will_attend, // True/False
            probability_present: result.prediction.probability_present,
            probability_absent: result.prediction.probability_absent,
        });
    } else {
        alert(`Prediction failed: ${result.error}`);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Predict Attendance (Registered Users)</h1>

      {/* Event dropdown */}
      <select
        className="border p-2 rounded mb-6 text-black bg-white"
        value={selectedEvent}
        onChange={(e) => fetchRegistrations(e.target.value)}
      >
        <option value="">Select Event</option>
        {events.map((event: any) => (
          <option key={event._id} value={event._id} className="text-black">
            {event.title}
          </option>
        ))}
      </select>

      {/* Registrations table */}
      {loading && selectedEvent ? ( // Corrected loading check
        <p className="text-black">Loading registrations...</p>
      ) : registrations.length > 0 ? (
        <table className="w-full bg-gray-100 rounded-lg shadow text-black">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="px-4 py-2 text-left text-black">Full Name</th>
              <th className="px-4 py-2 text-left text-black">Email</th>
              <th className="px-4 py-2 text-left text-black">Predict</th>
              <th className="px-4 py-2 text-left text-black">Result</th> 
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-200 text-black">
                <td className="px-4 py-2 text-black">{r.full_name}</td>
                <td className="px-4 py-2 text-black">{r.email || "-"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => predictAttendance(r._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                    disabled={loading} // Disabled while any prediction/fetch is running
                  >
                    {/* Display 'Predicting...' only for the currently clicked registration */}
                    {loading && predictionResult?.registrationId === r._id ? "Predicting..." : "Predict"}
                  </button>
                </td>
                <td className="px-4 py-2 text-black">
                    {/* Display prediction result if it matches the current registration */}
                    {predictionResult && predictionResult.registrationId === r._id && (
                        <div className={`font-semibold ${predictionResult.will_attend ? 'text-green-600' : 'text-red-600'}`}>
                            {predictionResult.will_attend ? 'PRESENT' : 'ABSENT'} 
                            ({predictionResult.probability_present}%)
                        </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedEvent && <p className="text-black">No registrations found for this event.</p>
      )}
    </div>
  );
}