"use client";

import { useState } from "react";

type Registrant = {
  district: string;
  urban: string;
  occupation: string;
  category: string;
  transportation: string;
  Past_Participant: string;
  Event_Relevance: string;
  Location_Closeness: string;
};

export default function PredictPage() {
  const [formData, setFormData] = useState<Registrant>({
    district: "",
    urban: "",
    occupation: "",
    category: "",
    transportation: "",
    Past_Participant: "",
    Event_Relevance: "",
    Location_Closeness: "",
  });

  const [result, setResult] = useState<{
    will_attend?: boolean;
    probability_present?: number;
    probability_absent?: number;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Event Attendance Prediction</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label style={{ display: "block", marginBottom: "0.3rem" }}>{key}</label>
            <input
              type="text"
              name={key}
              value={(formData as any)[key]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.4rem" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Predict
        </button>
      </form>

      {result.will_attend !== undefined && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Prediction Result:</h2>
          <p>
            Will Attend: <strong>{result.will_attend ? "Yes" : "No"}</strong>
          </p>
          <p>Probability Present: {result.probability_present?.toFixed(2)}</p>
          <p>Probability Absent: {result.probability_absent?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}