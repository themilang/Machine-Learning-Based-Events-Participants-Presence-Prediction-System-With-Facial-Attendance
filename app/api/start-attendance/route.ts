import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event_id } = body;

    if (!event_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Full path to Python executable (Anaconda in your case)
    const pythonPath = "/opt/anaconda3/bin/python3";

    // Full path to Python script (wrap in quotes to handle spaces)
    const scriptPath = "/Users/milanghimire/Code/fyp/Final_Year_Project/fresh start/fyp-pro/scripts/face_attendance.py";

    // Command to execute Python script with event_id argument
    const command = `"${pythonPath}" "${scriptPath}" "${event_id}"`;

    console.log("Executing command:", command);

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("❌ Python Error:", error.message);
          return resolve(
            NextResponse.json({ success: false, error: error.message }, { status: 500 })
          );
        }

        if (stderr) console.error("⚠️ Python stderr:", stderr);
        console.log("✅ Python Output:", stdout);

        resolve(
          NextResponse.json({
            success: true,
            message: "Attendance process started successfully.",
            output: stdout,
            stderr: stderr,
          })
        );
      });
    });
  } catch (err: any) {
    console.error("Error triggering attendance:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to trigger attendance." },
      { status: 500 }
    );
  }
}