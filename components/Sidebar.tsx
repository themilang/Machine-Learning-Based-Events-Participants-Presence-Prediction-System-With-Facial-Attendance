"use client";

import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Sidebar = () => {
  return (
    <aside
      className="w-64 bg-gray-800 text-white flex flex-col justify-between"
      style={{ top: "64px", height: "calc(100vh - 64px)", position: "sticky" }}
    >
      {/* Navigation links */}
      <div className="overflow-y-auto flex-1 p-4">
        <nav className="flex flex-col gap-3">
          <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
          <Link
            href="/dashboard/create-event"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Create Event
          </Link>
          <Link
            href="/dashboard/events"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Event List
          </Link>
          <Link
            href="/dashboard/registrations"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Registrations
          </Link>
          <Link
            href="/dashboard/predict-registered"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Predict Attendance (Registered)
          </Link>
          <Link
            href="/dashboard/take-attendance"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Take Attendance
          </Link>
          <Link
            href="/dashboard/attendance-record"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Attendance Record
          </Link>
          <Link
            href="/dashboard/overview"
            className="hover:bg-gray-700 p-2 rounded"
          >
           Overview
          </Link>
        </nav>
      </div>

      {/* Sign out at bottom */}
      <div className="p-4 border-t border-gray-700">
        <SignOutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
