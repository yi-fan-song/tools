"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-2">
      <Link href="/calorie-tracker">Calorie Tracker</Link>
      <Link href="/signup">Sign Up</Link>
      <Link href="/login">Log In</Link>
      <Link href="/logout">Log Out</Link>
    </main>
  );
}
