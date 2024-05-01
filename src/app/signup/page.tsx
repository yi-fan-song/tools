"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

import { AuthenticationWarning } from "@/components/AuthenticationWarning";
import { SupabaseContext } from "@/supabase/context";

export default function Home() {
  const supabase = useContext(SupabaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signup: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error);
        toast(error.message);
      } else {
        router.push("/");
      }

      setLoading(false);
    },
    [email, password, supabase, router]
  );
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <AuthenticationWarning />
      <form className="flex items-center flex-col gap-2">
        <span className="flex w-full justify-between flex-col">
          <label className="text-xs">Email</label>
          <input
            name="email"
            className="text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className="flex w-full justify-between flex-col">
          <label className="text-xs">Password</label>
          <input
            name="password"
            className="text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span className="flex w-full justify-evenly">
          <button type="submit" onClick={signup} disabled={loading}>
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button>
        </span>
      </form>
    </main>
  );
}
