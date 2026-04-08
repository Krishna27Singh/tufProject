import { useState, useEffect, useCallback } from "react";
import { loadNote, saveNote } from "@/core/storageService";
import { dateToKey } from "@/core/dateEngine";
import { useCalendar } from "@/context/CalendarContext";

export function useNotes() {
  const { rangeStart, rangeEnd } = useCalendar();
  const key = dateToKey(rangeStart, rangeEnd);
  const [text, setText] = useState("");

  useEffect(() => {
    const note = loadNote(key);
    setText(note || "");
  }, [key]);

  const save = useCallback(
    (value: string) => {
      setText(value);
      saveNote(key, value);
    },
    [key]
  );

  return { text, save, hasSelection: !!key };
}

