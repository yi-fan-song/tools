import { FC, MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";

import { SupabaseContext } from "@/supabase/context";

import type { CalorieEntry as CalorieEntryType } from "@/supabase/types";
export const CalorieEntry: FC<{
  entry: CalorieEntryType;
  removeSelf: () => void;
  updateSelf: (entry: CalorieEntryType) => void;
}> = ({ entry, removeSelf, updateSelf }) => {
  const supabase = useContext(SupabaseContext);
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(entry.name);
  const [calorieCount, setCalorieCount] = useState(entry.calorie_count);

  const toggleEdit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (editing) {
      setLoading(true);

      // update row
      const { error } = await supabase
        .from("calorie_entry")
        .update({ calorie_count: calorieCount, name })
        .eq("id", entry.id)
        .select();

      if (error) {
        toast(error.message);
        console.error(error);
      } else {
        updateSelf({ ...entry, calorie_count: calorieCount, name: name });
      }

      setLoading(false);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const deleteRow = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("calorie_entry")
      .delete()
      .eq("id", entry.id);

    if (error) {
      toast(error.message);
      console.error(error);
    }

    removeSelf();
    setLoading(false);
  };

  const inputDisabled = loading || !editing;

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
      <button type="submit" onClick={toggleEdit} disabled={loading}>
        {editing ? "save" : "edit"}
      </button>
      <button type="button" onClick={deleteRow} disabled={loading}>
        delete
      </button>
    </form>
  );
};
