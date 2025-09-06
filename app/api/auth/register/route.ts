import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!(email || password)) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }
  } catch (error) {}
}
