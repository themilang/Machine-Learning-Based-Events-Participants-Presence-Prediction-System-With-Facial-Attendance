// /types/event.ts for form submission by users registering for an event
export interface EventType {
  _id: string;
  title: string;
  description: string;
  date?: string | null;
  time?: string;
  venue?: string;
  category?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: any; // for other optional fields
}