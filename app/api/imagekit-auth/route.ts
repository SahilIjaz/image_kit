import ImageKit from "imagekit";

import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT!,
});
export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate authentication parameters" },
      { status: 500 }
    );
  }
}
