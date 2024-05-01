import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

import { SupabaseContext } from "@/supabase/context";

export const AuthenticatedPath = () => {
  const supabase = useContext(SupabaseContext);
  const router = useRouter();

  useEffect(() => {
    let canceled = false;

    (async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      }
    })().catch();

    return () => {
      canceled = true;
    };
  }, [supabase.auth, router]);

  return <></>;
};
