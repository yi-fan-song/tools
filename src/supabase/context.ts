import { createContext } from "react";

import { createClient } from "@supabase/supabase-js";

import { Database } from "./supabase";

const supabaseUrl = "https://hixvhfiqkorpicsijqig.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeHZoZmlxa29ycGljc2lqcWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NDYxMTksImV4cCI6MjAzMDAyMjExOX0.fZBMmE-L0nW-_e9qB5tGZDcrgAHsg1vzJ3K6rRh1FNA";

export const supabaseClient = createClient<Database>(supabaseUrl, SUPABASE_KEY);

export const SupabaseContext = createContext(supabaseClient);
