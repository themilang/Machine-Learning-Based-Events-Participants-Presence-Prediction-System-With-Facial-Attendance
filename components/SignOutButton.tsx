"use client";

import { useRouter } from "next/navigation";
interface SignOutButtonProps {
  className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/"); // redirect to home
  };

  return (
    <button
      onClick={handleSignOut}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
    >
      Sign Out
    </button>
  );
}