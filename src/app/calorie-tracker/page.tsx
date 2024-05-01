"use client";

import { CalorieEntryList } from "@/components/CalorieEntryList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-2">
      <CalorieEntryList />
    </main>
  );
}
