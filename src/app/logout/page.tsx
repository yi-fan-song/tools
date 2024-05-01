"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { SupabaseContext } from "@/supabase/context";

export default function Home() {
  const supabase = useContext(SupabaseContext);

  const router = useRouter();

  useEffect(() => {
    let canceled = false;

    (async () => {
      const { error } = await supabase.auth.signOut();
      console.log(error);
      router.push("/");
    })().catch();

    return () => {
      canceled = true;
    };
  }, [supabase.auth, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
