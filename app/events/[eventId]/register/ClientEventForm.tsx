"use client";
import { useState } from "react";
import { EventType } from "@/types/event";

interface Props {
  event: EventType;
}

export default function ClientEventForm({ event }: Props) {
  if (!event) return <p>Loading...</p>;

  const emptyFormData = {
    full_name: "",
    gender: "",
    age: 0,
    occupation: "",
    district: "",
    region: "",
    urban: false,
    past_events_registered: 0,
    past_events_attended: 0,
    last_event_attended: "",
    days_until_event: 0,
    registration_channel: "",
    ticket_type: "",
    ticket_price: 0,
    email_open_rate: 0,
    reminder_response: "",
    transportation: "",
    will_attend: false,
  };

  const [formData, setFormData] = useState(emptyFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let val: any = type === "checkbox" ? checked : value;

    // Convert number fields
    if (
      ["age", "past_events_registered", "past_events_attended", "days_until_event", "ticket_price", "email_open_rate"].includes(name)
    ) {
      val = Number(val);
    }

    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      last_event_attended: formData.last_event_attended ? new Date(formData.last_event_attended) : null,
      eventId: event._id,
    };

    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    if (res.ok) {
      alert("Registration submitted!");
      setFormData(emptyFormData);
    } else {
      const err = await res.json();
      console.error("Error submitting registration:", err);
      alert("Error submitting registration");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Event Details */}
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-500 mb-6">
        <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "-"} |{" "}
        <strong>Time:</strong> {event.time || "-"} |{" "}
        <strong>Venue:</strong> {event.venue || "-"} |{" "}
        <strong>Category:</strong> {event.category || "-"}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label>Full Name</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Gender</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Occupation</label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>District</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Region</label>
          <input type="text" name="region" value={formData.region} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <label>Urban</label>
          <input type="checkbox" name="urban" checked={formData.urban} onChange={handleChange} />
        </div>

        <div className="flex flex-col">
          <label>Past Events Registered</label>
          <input type="number" name="past_events_registered" value={formData.past_events_registered} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Past Events Attended</label>
          <input type="number" name="past_events_attended" value={formData.past_events_attended} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Last Event Attended</label>
          <input type="date" name="last_event_attended" value={formData.last_event_attended} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Days Until Event</label>
          <input type="number" name="days_until_event" value={formData.days_until_event} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Registration Channel</label>
          <input type="text" name="registration_channel" value={formData.registration_channel} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Ticket Type</label>
          <input type="text" name="ticket_type" value={formData.ticket_type} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Ticket Price</label>
          <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Email Open Rate</label>
          <input type="number" name="email_open_rate" value={formData.email_open_rate} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Reminder Response</label>
          <input type="text" name="reminder_response" value={formData.reminder_response} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label>Transportation</label>
          <input type="text" name="transportation" value={formData.transportation} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <label>Will Attend</label>
          <input type="checkbox" name="will_attend" checked={formData.will_attend} onChange={handleChange} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}