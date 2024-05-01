import { FC, MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";

import { SupabaseContext } from "@/supabase/context";

import type { CalorieEntry as CalorieEntryType } from "@/supabase/types";
export const NewCalorieEntry: FC<{
  cancel: () => void;
  saveEntry: (entry: CalorieEntryType) => void;
}> = ({ cancel, saveEntry }) => {
  const supabase = useContext(SupabaseContext);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [calorieCount, setCalorieCount] = useState(0);

  const addEntry: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    // update row
    const { data, error } = await supabase
      .from("calorie_entry")
      .insert([{ name, calorie_count: calorieCount }])
      .select();

    if (error || !data) {
      toast(error.message);
      console.error(error);
    } else {
      saveEntry(data[0]);
    }

    setLoading(false);
  };

  const inputDisabled = loading;

  return (
    <form className="flex flex-row gap-2 w-full justify-between">
      <input
        disabled={inputDisabled}
        className={inputDisabled ? "" : "text-black"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        disabled={inputDisabled}
        className={inputDisabled ? "" : "text-black"}
        value={calorieCount}
        onChange={(e) => {
          if (e.target.value === "") {
            setCalorieCount(0);
          }

          const parsed = Number.parseInt(e.target.value);

          if (!Number.isNaN(parsed)) {
            setCalorieCount(parsed);
          }
        }}
      />
      <button type="submit" onClick={addEntry} disabled={loading}>
        add
      </button>
      <button type="button" onClick={cancel} disabled={loading}>
        cancel
      </button>
    </form>
  );
};
