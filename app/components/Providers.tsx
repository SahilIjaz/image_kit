"use client";

import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
const urlEndPoint = process.env.IMAGE_KIT_URL_ENDPOINT!;
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = response.text();
        throw new Error(`Error fetching auth params: ${errorText}`);
      }

      const data = await response.json();
      const { signature, token, expire } = data;
      return { signature, token, expire };
    } catch (error) {
      throw new Error(`Network error: ${error}.`);
    }
  };

  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndPoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
