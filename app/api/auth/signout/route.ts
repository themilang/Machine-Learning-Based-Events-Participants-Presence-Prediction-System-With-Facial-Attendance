import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

  return response;
}



// import { NextResponse } from "next/server";

// export async function POST() {
//   const response = NextResponse.redirect("/"); // redirect to homepage
//   response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }); // clear token
//   return response;
// }