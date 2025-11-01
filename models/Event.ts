// import mongoose, { Schema, model, models } from "mongoose";

// const EventSchema = new Schema({
//   full_name: { type: String, required: true },
//   gender: { type: String, required: true },
//   age: { type: Number, required: true },
//   occupation: { type: String, required: true },
//   district: { type: String, required: true },
//   region: { type: String, required: true },
//   urban: { type: String, required: true },
//   transportation: { type: String, required: true },
// }, { timestamps: true });

// const Event = models.Event || model("Event", EventSchema);
// export default Event;
import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    venue: { type: String, required: true },
    
    description: { type: String },
    speakers: [{ type: String }],
    agenda: [{ type: String }],
    maxParticipants: { type: Number },
    organizer: { type: String },
    contact: { type: String },
    notes: { type: String },
    formId: { type: String },
    category: { type: String },      
    capacity: { type: Number }, 
    link: { type: String },
    createdBy: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 👇 Rename to clear model cache
const Event = models.Event || model("Event", EventSchema);

export default Event;