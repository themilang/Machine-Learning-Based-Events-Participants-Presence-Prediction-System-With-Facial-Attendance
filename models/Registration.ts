import mongoose, { Schema, model, models } from "mongoose";

const registrationSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    full_name: String,
    gender: String,
    age: Number,
    occupation: String,
    district: String,
    region: String,
    urban: String,
    past_events_registered: Number,
    past_events_attended: Number,
    last_event_attended: Date,
    days_until_event: Number,
    registration_channel: String,
    ticket_type: String,
    ticket_price: Number,
    email_open_rate: Number,
    reminder_response: String,
    transportation: String,
    will_attend: Boolean,
    imageUrl: String,
    location_closeness: String, 
    category: String,
    Past_Participant:String,
    Event_Relevance:String,
    predicted_attend: Boolean,
    probability_present: Number,
    probability_absent: Number,
  },
  { timestamps: true }
);

const Registration = models.Registration || model("Registration", registrationSchema);
export default Registration;