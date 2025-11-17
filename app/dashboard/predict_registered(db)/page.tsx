// "use client";

// import { useEffect, useState } from "react";

// type Registration = {
//   _id: string;
//   eventId: string;
//   full_name: string;
//   gender: string;
//   age: number;
//   occupation: string;
//   district: string;
//   urban: boolean;
//   reminder_response: string;
//   transportation: string;
//   will_attend: boolean;
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export default function Registrations() {
//   const [registrations, setRegistrations] = useState<Registration[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchRegistrations() {
//       try {
//         const res = await fetch("http://localhost:8000/registrations");
//         if (!res.ok) throw new Error("Failed to fetch data");

//         const data = await res.json();

//         // Ensure data.data exists and is an array
//         if (Array.isArray(data.data)) {
//           setRegistrations(data.data);
//         } else {
//           setRegistrations([]);
//           console.warn("Unexpected API response structure:", data);
//         }
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRegistrations();
//   }, []);

//   if (loading) return <p>Loading registrations...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!registrations || registrations.length === 0)
//     return <p>No registrations found.</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Registrations List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {registrations.map((reg) => (
//           <div
//             key={reg._id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             {reg.imageUrl && (
//               <img
//                 src={reg.imageUrl}
//                 alt={reg.full_name}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//             )}
//             <h2 className="text-xl font-semibold">{reg.full_name}</h2>
//             <p>
//               <strong>Gender:</strong> {reg.gender} | <strong>Age:</strong>{" "}
//               {reg.age}
//             </p>
//             <p>
//               <strong>Occupation:</strong> {reg.occupation}
//             </p>
//             <p>
//               <strong>District:</strong> {reg.district} |{" "}
//               <strong>Urban:</strong> {reg.urban ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Transportation:</strong> {reg.transportation}
//             </p>
//             <p>
//               <strong>Will Attend:</strong>{" "}
//               {reg.will_attend ? "Yes" : "No"}
//             </p>
//             <p className="text-sm text-gray-500">
//               Registered At: {new Date(reg.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// import { connectDB } from "@/lib/mongodb";
// import Registration from "@/models/Registration";
// import Event from "@/models/Event";

// export default async function AllRegistrationsPage() {
//   await connectDB();

//   // Fetch all registrations
//   const registrations = await Registration.find({}).lean();

//   // Fetch all events to map _id -> title
//   const events = await Event.find({}).lean();
//   const eventMap = events.reduce((acc: any, e: any) => {
//     acc[e._id.toString()] = e.title;
//     return acc;
//   }, {} as Record<string, string>);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-black">All Registered Persons</h1>

//       {registrations.length === 0 ? (
//         <p className="text-black">No registrations found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg shadow text-black">
//             <thead className="bg-gray-200 text-black">
//               <tr>
//                 <th className="px-4 py-2 text-left text-black">Full Name</th>
//                 <th className="px-4 py-2 text-left text-black">Event Name</th>
//                 <th className="px-4 py-2 text-left text-black">Gender</th>
//                 <th className="px-4 py-2 text-left text-black">Age</th>
//                 <th className="px-4 py-2 text-left text-black">Occupation</th>
//                 <th className="px-4 py-2 text-left text-black">District</th>
//                 <th className="px-4 py-2 text-left text-black">Urban</th>
//                 <th className="px-4 py-2 text-left text-black">Will Attend</th>
//               </tr>
//             </thead>
//             <tbody className="text-black">
//               {registrations.map((r: any) => (
//                 <tr key={r._id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2 text-black">{r.full_name}</td>
//                   <td className="px-4 py-2 text-black">{eventMap[r.eventId] || "Unknown"}</td>
//                   <td className="px-4 py-2 text-black">{r.gender}</td>
//                   <td className="px-4 py-2 text-black">{r.age}</td>
//                   <td className="px-4 py-2 text-black">{r.occupation}</td>
//                   <td className="px-4 py-2 text-black">{r.district}</td>
//                   <td className="px-4 py-2 text-black">{r.urban ? "Yes" : "No"}</td>
//                   <td className="px-4 py-2 text-black">{r.will_attend ? "Yes" : "No"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";

// type RegistrationType = {
//   _id: string;
//   full_name: string;
//   eventId: string;
//   gender: string;
//   age: number;
//   occupation: string;
//   district: string;
//   urban: boolean;
//   will_attend?: boolean;
//   category: string;
//   transportation: string;
//   past_participant: boolean;
//   event_relevance: string;
//   location_closeness: string;
// };

// type Prediction = {
//   will_attend: boolean;
//   probability_present: number;
//   probability_absent: number;
// };

// export default function PredictRegisteredPage() {
//   const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
//   const [eventMap, setEventMap] = useState<Record<string, string>>({});
//   const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
//   const [loading, setLoading] = useState<Record<string, boolean>>({});
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     fetch("/api/predict-registered")
//       .then((res) => res.json())
//       .then((data) => {
//         setRegistrations(data.registrations || []);
//         setEventMap(data.eventMap || {});
//       })
//       .catch(console.error)
//       .finally(() => setFetching(false));
//   }, []);

//   const predictRegistrant = async (r: RegistrationType) => {
//     setLoading((prev) => ({ ...prev, [r._id]: true }));
//     try {
//       const res = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           district: r.district,
//           urban: r.urban ? "Yes" : "No",
//           occupation: r.occupation,
//           category: r.category,
//           transportation: r.transportation,
//           Past_Participant: r.past_participant ? "Yes" : "No",
//           Event_Relevance: r.event_relevance,
//           Location_Closeness: r.location_closeness,
//         }),
//       });
//       const data = await res.json();
//       setPredictions((prev) => ({ ...prev, [r._id]: data }));
//     } catch (err) {
//       console.error(err);
//       alert("Prediction failed");
//     } finally {
//       setLoading((prev) => ({ ...prev, [r._id]: false }));
//     }
//   };

//   if (fetching) return <p className="p-8">Loading registrations...</p>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-black">All Registered Persons</h1>
//       {registrations.length === 0 ? (
//         <p>No registrations found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg shadow text-black">
//             <thead className="bg-gray-200 text-black">
//               <tr>
//                 <th>Full Name</th>
//                 <th>Event Name</th>
//                 <th>Gender</th>
//                 <th>Age</th>
//                 <th>Occupation</th>
//                 <th>District</th>
//                 <th>Urban</th>
//                 <th>Will Attend</th>
//                 <th>Predicted Attendance</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registrations.map((r) => (
//                 <tr key={r._id} className="border-b hover:bg-gray-50">
//                   <td>{r.full_name}</td>
//                   <td>{eventMap[r.eventId] || "Unknown"}</td>
//                   <td>{r.gender}</td>
//                   <td>{r.age}</td>
//                   <td>{r.occupation}</td>
//                   <td>{r.district}</td>
//                   <td>{r.urban ? "Yes" : "No"}</td>
//                   <td>{r.will_attend ? "Yes" : "No"}</td>
//                   <td>
//                     {predictions[r._id]
//                       ? `${predictions[r._id].will_attend ? "Yes" : "No"} (${predictions[r._id].probability_present.toFixed(2)})`
//                       : "-"}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => predictRegistrant(r)}
//                       disabled={loading[r._id]}
//                       className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
//                     >
//                       {loading[r._id] ? "Predicting..." : "Predict"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";

type RegistrationType = {
  _id: string;
  full_name: string;
  eventId: string;
  gender: string;
  age: number;
  occupation: string;
  district: string;
  urban: string;
  will_attend?: boolean;
  category: string;
  transportation: string;
  Past_Participant: string;
  event_relevance: string;
  location_closeness: string;
};

type Prediction = {
  will_attend: boolean;
  probability_present: number;
  probability_absent: number;
};

export default function PredictRegisteredPage() {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [eventMap, setEventMap] = useState<Record<string, string>>({});
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [fetching, setFetching] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    registration: RegistrationType;
    payload: Record<string, any>;
    prediction?: Prediction;
  } | null>(null);

  useEffect(() => {
    fetch("/api/predict-registered")
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data.registrations || []);
        setEventMap(data.eventMap || {});
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const predictRegistrant = async (r: RegistrationType) => {
    setLoading((prev) => ({ ...prev, [r._id]: true }));

    const payload = {
      district: r.district,
      urban: typeof r.urban === "string"
        ? r.urban.charAt(0).toUpperCase() + r.urban.slice(1).toLowerCase()
        : r.urban,
      occupation: r.occupation,
      category: r.category,
      transportation: r.transportation,
      Past_Participant: r.Past_Participant,
      Event_Relevance:
        typeof r.event_relevance === "string"
          ? r.event_relevance.charAt(0).toUpperCase() +
            r.event_relevance.slice(1).toLowerCase()
          : r.event_relevance,
      Location_Closeness:
        typeof r.location_closeness === "string"
          ? r.location_closeness.charAt(0).toUpperCase() +
            r.location_closeness.slice(1).toLowerCase()
          : r.location_closeness,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setPredictions((prev) => ({ ...prev, [r._id]: data }));

      setModalData({ registration: r, payload, prediction: data });
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading((prev) => ({ ...prev, [r._id]: false }));
    }
  };

  if (fetching) return <p className="p-8">Loading registrations...</p>;

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">All Registered Persons</h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-black">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th>Full Name</th>
                <th>Event Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Occupation</th>
                <th>District</th>
                <th>Urban</th>
                <th>Will Attend</th>
                <th>Predicted Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td>{r.full_name}</td>
                  <td>{eventMap[r.eventId] || "Unknown"}</td>
                  <td>{r.gender}</td>
                  <td>{r.age}</td>
                  <td>{r.occupation}</td>
                  <td>{r.district}</td>
                  <td>{r.urban }</td>
                  <td>{r.will_attend ? "Yes" : "No"}</td>
                  <td>
                    {predictions[r._id]
                      ? `${predictions[r._id].will_attend ? "Yes" : "No"} (${predictions[r._id].probability_present.toFixed(2)})`
                      : "-"}
                  </td>
                  <td>
                    <button
                      onClick={() => predictRegistrant(r)}
                      disabled={loading[r._id]}
                      className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                      {loading[r._id] ? "Predicting..." : "Predict"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Overlay with blur */}
          <div className="absolute inset-0 bg-transparent backdrop-blur-sm"></div>
          {/* Modal content */}
          <div
            className={`relative z-10 rounded-xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-[85vh] overflow-hidden
  ${
    modalData.prediction?.will_attend
      ? "bg-green-100 border border-green-300"
      : "bg-red-100 border border-red-300"
  }`}
          >
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-black transition"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
              {modalData.registration.full_name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Personal Details</h3>
                <p><strong>Event:</strong> {eventMap[modalData.registration.eventId]}</p>
                <p><strong>Gender:</strong> {modalData.registration.gender}</p>
                <p><strong>Age:</strong> {modalData.registration.age}</p>
                <p><strong>District:</strong> {modalData.registration.district}</p>
                <p><strong>Urban:</strong> {modalData.registration.urban}</p>
                <p><strong>Occupation:</strong> {modalData.registration.occupation}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Event Insights</h3>
                <p><strong>Category:</strong> {modalData.registration.category}</p>
                <p><strong>Past Participant:</strong> {modalData.registration.Past_Participant}</p>
                <p><strong>Event Relevance:</strong> {modalData.registration.event_relevance}</p>
                <p><strong>Location Closeness:</strong> {modalData.registration.location_closeness}</p>
              </div>
            </div>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2 text-gray-700 text-sm">Data Sent to Model</h3>
            <pre className="bg-gray-900 text-green-300 p-3 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(modalData.payload, null, 2)}
            </pre>

            <hr className="my-4" />

            {modalData.prediction && (
              <div
                className={`
      mt-4 p-5 rounded-xl text-center shadow-lg border
      ${
        modalData.prediction.will_attend
          ? "bg-green-200 border-green-500 text-green-900"
          : "bg-red-200 border-red-500 text-red-900"
      }
    `}
              >
                <h3 className="text-xl font-extrabold tracking-wide">
                  {modalData.prediction.will_attend ? "WILL ATTEND" : "WILL NOT ATTEND"}
                </h3>
                <p className="text-sm mt-1 opacity-80">
                  Probability:{" "}
                  {modalData.prediction.will_attend
                    ? modalData.prediction.probability_present.toFixed(2)
                    : modalData.prediction.probability_absent.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}