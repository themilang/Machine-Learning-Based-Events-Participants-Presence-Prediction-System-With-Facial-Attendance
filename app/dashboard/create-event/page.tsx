"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    capacity: "",
    organizer: "",
    contact: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, capacity: Number(formData.capacity) }),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        category: "",
        capacity: "",
        organizer: "",
        contact: "",
        notes: "",
      });
    } else {
      alert("❌ Failed to create event: " + (data.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Create Event</h1>
        <nav className="text-gray-500 text-sm">Dashboard &gt; Events &gt; Create</nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Example stats */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form */}
        <div className="flex-1 bg-white shadow-lg rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Event Details</h2>

          <div className="grid grid-cols-1 gap-4">
            <label className="text-gray-700 font-medium mb-1" htmlFor="title">Event Title</label>
            <input
              id="title"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />

            <label className="text-gray-700 font-medium mb-1" htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm resize-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-700 font-medium mb-1" htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm w-full"
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium mb-1" htmlFor="time">Time</label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm w-full"
                />
              </div>
            </div>

            <label className="text-gray-700 font-medium mb-1" htmlFor="venue">Venue / Location</label>
            <input
              id="venue"
              name="venue"
              placeholder="Venue / Location"
              value={formData.venue}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />

            <div className="md:flex gap-4">
              <div className="flex-1">
                <label className="text-gray-700 font-medium mb-1" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Business">Business</option>
                  <option value="General">General</option>
                  <option value="Educational">Educational</option>
                  <option value="NGOS">NGOS</option>
                  <option value="Cultural/Traditional">Cultural/Traditional</option>
                  <option value="Tech">Tech</option>
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                  <option value="Training">Training</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <label className="text-gray-700 font-medium mb-1" htmlFor="capacity">Capacity</label>
                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
                />
              </div>
            </div>

            <label className="text-gray-700 font-medium mb-1" htmlFor="organizer">Organizer Name</label>
            <input
              id="organizer"
              name="organizer"
              placeholder="Organizer Name"
              value={formData.organizer}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />

            <label className="text-gray-700 font-medium mb-1" htmlFor="contact">Contact (Email or Phone)</label>
            <input
              id="contact"
              name="contact"
              placeholder="Contact (Email or Phone)"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />

            <label className="text-gray-700 font-medium mb-1" htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm resize-none"
            />

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all text-lg"
            >
              Create Event
            </button>
          </div>
        </div>

        {/* Recent Events Sidebar */}
        <div className="w-full md:w-1/3 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Recent Events</h3>
          {[
            { title: "AI Workshop", date: "Sep 12, 2025", venue: "Tech Hub, Kathmandu", capacity: 120 },
            { title: "Tech Meetup", date: "Sep 8, 2025", venue: "Innovation Center, Lalitpur", capacity: 85 },
            { title: "Marketing Seminar", date: "Sep 5, 2025", venue: "Business Hall, Bhaktapur", capacity: 200 },
            { title: "Product Launch", date: "Sep 2, 2025", venue: "Grand Hall, Kathmandu", capacity: 150 },
            { title: "Webinar on AI", date: "Aug 30, 2025", venue: "Online", capacity: 300 },
          ].map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <h4 className="font-semibold text-gray-800">{event.title}</h4>
              <p className="text-gray-500 text-sm">{event.date}</p>
              <p className="text-gray-500 text-sm">{event.venue}</p>
              <p className="text-gray-500 text-sm">Capacity: {event.capacity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}