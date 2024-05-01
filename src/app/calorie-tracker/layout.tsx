"use client";
import { AuthenticatedPath } from "@/components/AuthenticatedPath";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthenticatedPath />
      {children}
    </>
  );
}
