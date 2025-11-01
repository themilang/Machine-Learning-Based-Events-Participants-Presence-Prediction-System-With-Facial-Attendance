"use client";

import { useState, useRef, useEffect } from "react";
import SignOutButton from "@/components/SignOutButton";

interface UserDropdownProps {
  name: string;
  email: string;
}

export default function UserDropdown({ name, email }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">{name[0]}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-gray-700 rounded-lg shadow-lg z-50 p-4 text-white">
          <div className="flex flex-col gap-1 mb-3 border-b border-gray-600 pb-3">
            <span className="font-semibold">{name}</span>
            <span className="text-sm text-gray-300 truncate">{email}</span>
          </div>
          <SignOutButton className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm" />
        </div>
      )}
    </div>
  );
}