// "use client";
// import { useState } from "react";
// import { EventType } from "@/types/event";

// interface Props {
//   event: EventType;
// }

// export default function ClientEventForm({ event }: Props) {
//   if (!event) return <p>Loading...</p>;

//   const emptyFormData = {
//     full_name: "",
//     gender: "",
//     age: 0,
//     occupation: "",
//     district: "",
//     region: "",
//     urban: false,
//     past_events_registered: 0,
//     past_events_attended: 0,
//     last_event_attended: "",
//     days_until_event: 0,
//     registration_channel: "",
//     ticket_type: "",
//     ticket_price: 0,
//     email_open_rate: 0,
//     reminder_response: "",
//     transportation: "",
//     will_attend: false,
//   };

//   const [formData, setFormData] = useState(emptyFormData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     let val: any = type === "checkbox" ? checked : value;

//     // Convert number fields
//     if (
//       ["age", "past_events_registered", "past_events_attended", "days_until_event", "ticket_price", "email_open_rate"].includes(name)
//     ) {
//       val = Number(val);
//     }

//     setFormData(prev => ({ ...prev, [name]: val }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const submitData = {
//       ...formData,
//       last_event_attended: formData.last_event_attended ? new Date(formData.last_event_attended) : null,
//       eventId: event._id,
//     };

//     const res = await fetch("/api/registrations", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(submitData),
//     });

//     if (res.ok) {
//       alert("Registration submitted!");
//       setFormData(emptyFormData);
//     } else {
//       const err = await res.json();
//       console.error("Error submitting registration:", err);
//       alert("Error submitting registration");
//     }
//   };

//   return (
//     <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
//       {/* Event Details */}
//       <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
//       <p className="text-gray-700 mb-2">{event.description}</p>
//       <p className="text-gray-500 mb-6">
//         <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "-"} |{" "}
//         <strong>Time:</strong> {event.time || "-"} |{" "}
//         <strong>Venue:</strong> {event.venue || "-"} |{" "}
//         <strong>Category:</strong> {event.category || "-"}
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col">
//           <label>Full Name</label>
//           <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Gender</label>
//           <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Age</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Occupation</label>
//           <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>District</label>
//           <input type="text" name="district" value={formData.district} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Region</label>
//           <input type="text" name="region" value={formData.region} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex items-center gap-2">
//           <label>Urban</label>
//           <input type="checkbox" name="urban" checked={formData.urban} onChange={handleChange} />
//         </div>

//         <div className="flex flex-col">
//           <label>Past Events Registered</label>
//           <input type="number" name="past_events_registered" value={formData.past_events_registered} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Past Events Attended</label>
//           <input type="number" name="past_events_attended" value={formData.past_events_attended} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Last Event Attended</label>
//           <input type="date" name="last_event_attended" value={formData.last_event_attended} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Days Until Event</label>
//           <input type="number" name="days_until_event" value={formData.days_until_event} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Registration Channel</label>
//           <input type="text" name="registration_channel" value={formData.registration_channel} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Ticket Type</label>
//           <input type="text" name="ticket_type" value={formData.ticket_type} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Ticket Price</label>
//           <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Email Open Rate</label>
//           <input type="number" name="email_open_rate" value={formData.email_open_rate} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Reminder Response</label>
//           <input type="text" name="reminder_response" value={formData.reminder_response} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex flex-col">
//           <label>Transportation</label>
//           <input type="text" name="transportation" value={formData.transportation} onChange={handleChange} className="border p-2 rounded" />
//         </div>

//         <div className="flex items-center gap-2">
//           <label>Will Attend</label>
//           <input type="checkbox" name="will_attend" checked={formData.will_attend} onChange={handleChange} />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }



//working for cloudinary image upload

// "use client";
// import { useState } from "react";
// import { EventType } from "@/types/event";

// interface Props {
//   event: EventType;
// }

// export default function ClientEventForm({ event }: Props) {
//   const emptyFormData = {
//     full_name: "",
//     gender: "",
//     age: 0,
//     occupation: "",
//     district: "",
//     region: "",
//     image_url: "", // ✅ add image URL
//   };

//   const [formData, setFormData] = useState(emptyFormData);
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // ✅ Upload image to Cloudinary
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     const formDataToSend = new FormData();
//     formDataToSend.append("file", file);

//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formDataToSend,
//       });
//       const data = await res.json();

//       if (data.secure_url) {
//         setFormData(prev => ({ ...prev, image_url: data.secure_url }));
//         alert("Image uploaded successfully!");
//       } else {
//         alert("Upload failed");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/registrations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         alert("Form submitted successfully!");
//         setFormData(emptyFormData);
//       } else {
//         alert("Form submission failed");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
//       <h1 className="text-3xl font-bold mb-4">{event?.title}</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col">
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>Gender</label>
//           <input
//             type="text"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>Age</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>Occupation</label>
//           <input
//             type="text"
//             name="occupation"
//             value={formData.occupation}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label>District</label>
//           <input
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         {/* ✅ Image upload field */}
//         <div className="flex items-center gap-2">
//           <input type="file" onChange={handleImageUpload} />
//           {uploading ? (
//             <span className="text-blue-500">Uploading...</span>
//           ) : (
//             formData.image_url && (
//               <img
//                 src={formData.image_url}
//                 alt="Uploaded"
//                 className="w-16 h-16 rounded object-cover"
//               />
//             )
//           )}
//         </div>

//         {/* ✅ Hidden image URL field */}
//         <div className="flex flex-col">
//           <label>Image URL</label>
//           <input
//             type="text"
//             name="image_url"
//             value={formData.image_url}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             readOnly
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }





// trying with mongodb atlas and cloudinary
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
    urban: "",
    Past_Participant: "",
    // past_events_registered: 0,
    // past_events_attended: 0,
    // last_event_attended: "",
    // days_until_event: 0,
    // registration_channel: "",
    // ticket_type: "",
    // ticket_price: 0,
    // email_open_rate: 0,
    location_closeness: "",
    reminder_response: "",
    transportation: "",
    will_attend: false,
    imageUrl: "", // ✅ this must match the schema field
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle all input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name } = target;

    let val: any;

    if (target instanceof HTMLInputElement) {
      val = target.type === "checkbox" ? target.checked : target.value;
    } else {
      val = target.value;
    }

    if (["age"].includes(name)) {
      val = Number(val);
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Select a file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  // Upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
if (result.secure_url) {
    setFormData((prev) => ({ ...prev, imageUrl: result.secure_url })); // camelCase!
    alert("Image uploaded successfully!");
}
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Submit form to MongoDB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debugging: log formData before submit
    console.log("Submitting formData:", formData);

    const submitData = {
      ...formData,
//      last_event_attended: formData.last_event_attended ? new Date(formData.last_event_attended) : null,
      eventId: event._id,
      category: event.category || "-",
    };

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        alert("Registration submitted successfully!");
        setFormData(emptyFormData);
        setFile(null);
      } else {
        const err = await res.json();
        console.error("Error submitting registration:", err);
        alert("Error submitting registration.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Event Details */}
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-500 mb-6">
        <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "-"} |{" "}
        <strong>Time:</strong> {event.time || "-"} | <strong>Venue:</strong> {event.venue || "-"} |{" "}
        <strong>Category:</strong> {event.category || "-"}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>


        {/* Occupation dropdown */}
        <div className="flex flex-col">
          <label>Occupation</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Occupation</option>
            <option value="Engineer">Engineer</option>
            <option value="IT">IT</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Service">Service</option>
            <option value="Farmer">Farmer</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>


        {/* District dropdown */}
        <div className="flex flex-col">
          <label>District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select District</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Kaski">Kaski</option>
            <option value="Jhapa">Jhapa</option>
            <option value="Chitwan">Chitwan</option>
            <option value="Morang">Morang</option>
            <option value="Banke">Banke</option>
            <option value="Kailali">Kailali</option>
            <option value="Dolakha">Dolakha</option>
            <option value="Surkhet">Surkhet</option>
            <option value="Dhanusha">Dhanusha</option>
          </select>
        </div>

        {/* Past Participant */}
        <div className="flex flex-col">
          <label>Past Participant</label>
          <select
            name="Past_Participant"
            value={formData.Past_Participant}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>


        {/* Reminder Response */}
        {/* <div className="flex flex-col">
          <label>Reminder Response</label>
          <input
            type="text"
            name="reminder_response"
            value={formData.reminder_response}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div> */}

        {/* Transportation dropdown */}
        <div className="flex flex-col">
          <label>Transportation</label>
          <select
            name="transportation"
            value={formData.transportation}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Transport</option>
            <option value="Bus">Bus</option>
            <option value="Walking">Walking</option>
            <option value="Auto">Auto</option>
            <option value="Bike">Bike</option>
            <option value="Scooty">Scooty</option>
            <option value="Car">Car</option>
            <option value="Cycle">Cycle</option>
          </select>
        </div>
        


  {/* urban dropdown */}
        <div className="flex flex-col">
          <label>Area of Living </label>
          <select
            name="urban"
            value={formData.urban}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Area of Living</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            
          </select>
        </div>




























        {/* Checkbox Inputs */}
        {/* {["urban", "will_attend"].map((field) => (
          <div key={field} className="flex items-center gap-2">
            <label className="capitalize">{field.replace("_", " ")}</label>
            <input
              type="checkbox"
              name={field}
              checked={formData[field as keyof typeof formData] as boolean}
              onChange={handleChange}
            />
          </div>
        ))} */}

        {/* Location Closeness Dropdown */}
        <div className="flex flex-col">
          <label>Location Closeness</label>
          <select
            name="location_closeness"
            value={formData.location_closeness}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Near">Near</option>
            <option value="Medium">Medium</option>
            <option value="Far">Far</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3 mt-4">
          <input type="file" accept="image/*" onChange={handleFileSelect} />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Uploaded" className="w-16 h-16 rounded object-cover" />
          )}
        </div>

        {/* Show URL */}
        {formData.imageUrl && (
          <div className="flex flex-col">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}