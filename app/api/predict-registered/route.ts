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

    // Send to your Python API for prediction
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    });

    const prediction = await response.json();
    return NextResponse.json({ success: true, prediction });
  } catch (err) {
    console.error("Prediction error:", err);
    return NextResponse.json({ success: false, error: "Prediction failed" });
  }
}