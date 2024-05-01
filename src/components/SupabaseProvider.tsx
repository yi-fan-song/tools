"use client";
import React from "react";

import { supabaseClient, SupabaseContext } from "@/supabase/context";

export const SupabaseProvider: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};
