import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}