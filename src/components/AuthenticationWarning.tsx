"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import { SupabaseContext } from "@/supabase/context";

export const AuthenticationWarning: React.FC = () => {
  const supabase = useContext(SupabaseContext);

  const [className, setClassName] = useState("hidden");

  useEffect(() => {
    let canceled = false;

    (async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        setClassName("");
      } else {
        setClassName("hidden");
      }
    })().catch();

    return () => {
      canceled = true;
    };
  }, [supabase.auth]);

  return (
    <span className={"flex flex-row gap-2 " + className}>
      <p className="text-red-500">You are already logged in.</p>{" "}
      <Link href="/">Home</Link>
    </span>
  );
};
