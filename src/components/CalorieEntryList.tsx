"use client";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { SupabaseContext } from "@/supabase/context";
import { CalorieEntry as CalorieEntryType } from "@/supabase/types";

import { CalorieEntry } from "./CalorieEntry";
import { NewCalorieEntry } from "./NewCalorieEntry";

export const CalorieEntryList = () => {
  const supabase = useContext(SupabaseContext);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<CalorieEntryType[]>([]);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const today = new Date(Date.now());
      today.setHours(0);
      today.setMinutes(0);
      today.setMilliseconds(0);
      today.setSeconds(0);

      const { data, error } = await supabase
        .from("calorie_entry")
        .select("*")
        .gte("created_at", today.toISOString());

      if (!data) {
        console.error(error.message);
        toast("something went wrong");
        setLoading(false);
      } else {
        setEntries(data);
        setLoading(false);
      }
    })().catch(console.error);

    return () => {
      canceled = true;
    };
  }, [supabase]);

  const [adding, setAdding] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 w-full justify-between">
          <span className="w-full">Name</span>
          <span className="w-full">Calorie Count</span>
          <button disabled className="invisible">
            edit
          </button>
          <button disabled className="invisible">
            delete
          </button>
        </div>
        {loading ? (
          <p>loading...</p>
        ) : (
          entries.map((e) => {
            return (
              <CalorieEntry
                key={e.id}
                entry={e}
                removeSelf={() => {
                  setEntries(entries.filter((e2) => e2.id !== e.id));
                }}
                updateSelf={(newEntry) => {
                  setEntries(
                    entries.map((e2) => {
                      if (e2.id !== e.id) {
                        return e2;
                      }
                      return newEntry;
                    })
                  );
                }}
              />
            );
          })
        )}
        {adding ? (
          <NewCalorieEntry
            cancel={() => setAdding(false)}
            saveEntry={(newEntry) => {
              setEntries([...entries, newEntry]);
              setAdding(false);
            }}
          />
        ) : null}
      </div>
      <div className="flex flex-row gap-2">
        <p>
          Daily Total:{" "}
          {entries.reduce((acc, e) => {
            return acc + e.calorie_count;
          }, 0)}
        </p>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className={adding ? "hidden" : ""}
        >
          Add Entry
        </button>
      </div>
    </>
  );
};
