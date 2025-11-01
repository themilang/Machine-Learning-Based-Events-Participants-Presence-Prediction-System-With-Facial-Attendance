"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface FormState {
  title: string;
  date: string;
  description: string;
}

export default function InviteParticipantsPage() {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    date: "",
    description: ""
  });
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateLink = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        setGeneratedLink(data.link);
        // Reset form
        setFormData({
          title: "",
          date: "",
          description: ""
        });
      } else {
        alert(data.error || "Failed to generate link");
      }
    } catch (error) {
      console.error("Error generating link:", error);
      alert("Failed to generate link");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Invite Participants</h1>
        <p className="text-gray-600 mb-8">Generate a form link to collect participant information</p>

        <form onSubmit={handleGenerateLink} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Form Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter form title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter form description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isGenerating ? "Generating Link..." : "Generate Form Link"}
            </button>
          </div>

          {generatedLink && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold mb-3">Form Link Generated Successfully!</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 p-2 bg-white border border-green-300 rounded text-green-700 text-sm"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Copy
                </button>
              </div>
              <p className="text-green-600 text-sm mt-2">
                Share this link with participants to collect their information
              </p>
            </div>
          )}
        </form>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-800">Generate Link</h3>
              <p className="text-sm text-gray-600 mt-1">Create a unique form link with your event details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-800">Share</h3>
              <p className="text-sm text-gray-600 mt-1">Send the link to participants via email or message</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-800">Collect Data</h3>
              <p className="text-sm text-gray-600 mt-1">Responses are automatically saved to your database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}