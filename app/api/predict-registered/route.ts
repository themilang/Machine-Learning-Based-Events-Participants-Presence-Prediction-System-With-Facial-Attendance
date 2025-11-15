// /api/predict-registered/route.ts (No changes needed, but ensure your Registration model has all the necessary fields)

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { registrationId } = await req.json();

    const registration = await Registration.findById(registrationId).lean();
    if (!registration)
      return NextResponse.json({ success: false, error: "Registration not found" });

    // Ensure the MongoDB document fields match the Python model's expected fields
    // The Python API handles the necessary dropping of extra fields like _id, so this is fine.
    const response = await fetch("http://localhost:8000/predict", { // Ensure this URL is correct
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    });

    const prediction = await response.json();
    
    // Check for success/failure from Python API
    if (response.status !== 200) {
        return NextResponse.json({ success: false, error: prediction.detail || "Python prediction service failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, prediction });
  } catch (err) {
    console.error("Prediction error:", err);
    return NextResponse.json({ success: false, error: "Prediction failed" });
  }
}