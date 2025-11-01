// export interface CreateEventRequest {
//   title: string;
//   date: string;
//   time: string;
//   venue: string;
//   description: string;
//   speakers: string[];
//   agenda: string[];
//   maxParticipants?: number;
// }

// export interface CreateEventResponse {
//   success: boolean;
//   link: string;
//   eventId: string;
//   error?: string;
// }

// export interface SubmitResponseRequest {
//   eventId: string;
//   formId: string;
//   name: string;
//   email: string;
//   phone?: string;
//   company?: string;
//   position?: string;
//   dietaryRequirements?: string;
//   questions?: string;
// }

// export interface SubmitResponseResponse {
//   success: boolean;
//   message: string;
//   error?: string;
// }

// export interface EventData {
//   _id: string;
//   title: string;
//   date: string;
//   time: string;
//   venue: string;
//   description: string;
//   speakers: string[];
//   agenda: string[];
//   maxParticipants?: number;
//   formId: string;
//   link: string;
//   createdBy: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface EventResponse {
//   _id: string;
//   eventId: string;
//   formId: string;
//   name: string;
//   email: string;
//   phone?: string;
//   company?: string;
//   position?: string;
//   dietaryRequirements?: string;
//   questions?: string;
//   submittedAt: string;
//   createdAt: string;
//   updatedAt: string;
// }


// -------------------------------------
// Interfaces for Event Creation
// -------------------------------------

export interface CreateEventRequest {
  title: string;
  date: string; // ISO string preferred (e.g., "2025-11-01")
  time?: string;
  venue: string;
  description?: string;
  speakers?: string[];
  agenda?: string[];
  category?: string;
  capacity?: number;
  maxParticipants?: number;
  organizer?: string;
  contact?: string;
  notes?: string;
}

// -------------------------------------
// Response after Event Creation
// -------------------------------------

export interface CreateEventResponse {
  success: boolean;
  link?: string;      // Generated shareable form link
  eventId?: string;   // MongoDB _id
  error?: string;
}

// -------------------------------------
// Form Submission Interfaces
// -------------------------------------

export interface SubmitResponseRequest {
  eventId: string;
  formId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  dietaryRequirements?: string;
  questions?: string;
}

export interface SubmitResponseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// -------------------------------------
// Stored Event Data (MongoDB Schema match)
// -------------------------------------

export interface EventData {
  _id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  description?: string;
  speakers?: string[];
  agenda?: string[];
  category?: string;
  capacity?: number;
  maxParticipants?: number;
  organizer?: string;
  contact?: string;
  notes?: string;
  formId?: string;
  link?: string;
  createdBy?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------
// Individual Participant Response
// -------------------------------------

export interface EventResponse {
  _id: string;
  eventId: string;
  formId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  dietaryRequirements?: string;
  questions?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}
