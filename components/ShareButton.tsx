"use client";

import { useState } from "react";

export default function ShareButton({ eventId }: { eventId: string }) {
  const [link, setLink] = useState("");

  const generateLink = () => {
    const url = `${window.location.origin}/events/${eventId}/register`;
    setLink(url);
    navigator.clipboard.writeText(url);
    alert("Shareable link copied to clipboard!");
  };

  return (
    <div className="mt-auto">
      <button
        onClick={generateLink}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Generate Shareable Link
      </button>
      {link && <p className="text-sm mt-2 text-gray-600 break-all">{link}</p>}
    </div>
  );
}