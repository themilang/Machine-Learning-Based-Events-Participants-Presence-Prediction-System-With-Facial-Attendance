import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import UserDropdown from "@/components/UserDropdown"; // import the client dropdown

const JWT_SECRET = process.env.JWT_SECRET as string;

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const cookieHeader = headerList.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;

  if (!token) redirect("/signin");

  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as { name: string; email: string };
  } catch {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <header className="w-full bg-gray-800 text-white flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-50">
        <h2 className="text-xl font-bold">Event AI Dashboard</h2>

        <UserDropdown name={user.name} email={user.email} />
      </header>

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}