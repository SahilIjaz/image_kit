import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!(email || password)) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    const user = await User.create({ email, password });
    return NextResponse.json(
      { message: "User registered successfully.", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error, duing user registeration.", error },
      { status: 500 }
    );
  }
}
