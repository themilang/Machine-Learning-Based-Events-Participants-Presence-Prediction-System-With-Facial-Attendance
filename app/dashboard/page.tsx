export const dynamic = "force-dynamic"; // ✅ Important

import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function DashboardPage() {
  const headerList = await headers();
  const cookieHeader = headerList.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;

  if (!token) {
    redirect("/signin");
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome, {decoded.name} 👋
        </h1>
        <p className="text-gray-600">Email: {decoded.email}</p>

       
  <SignOutButton />

      </div>
    );
  } catch {
    redirect("/signin");
  }
}