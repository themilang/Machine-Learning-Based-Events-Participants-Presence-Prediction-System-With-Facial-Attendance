// "use client";
// import { useState } from "react";

// export default function PredictForm() {
//   const [formData, setFormData] = useState({
//     district: "",
//     urban: "",
//     occupation: "",
//     category: "",
//     transportation: "",
//     Past_Participant: "",
//     Event_Relevance: "",
//     Location_Closeness: "",
//     will_attend: ""
//   });

//   const [result, setResult] = useState<any>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     });
//     const data = await res.json();
//     setResult(data);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-2">
//         {Object.keys(formData).map((key) => (
//           <input
//             key={key}
//             name={key}
//             placeholder={key}
//             value={formData[key as keyof typeof formData]}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         ))}
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//           Predict
//         </button>
//       </form>

//       {result && (
//         <div className="mt-4 border p-2 rounded">
//           <p><strong>Prediction:</strong> {result.prediction}</p>
//           <p><strong>Probability Present:</strong> {result.prob_present}</p>
//           <p><strong>Probability Absent:</strong> {result.prob_absent}</p>
//         </div>
//       )}
//     </div>
//   );
// }