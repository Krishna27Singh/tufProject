import React, { createContext, useContext, useReducer, type Dispatch } from "react";
import { isBefore, isSameDay } from "date-fns";

export interface CalendarState {
  currentMonth: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

export type CalendarAction =
  | { type: "SET_MONTH"; payload: Date }
  | { type: "SELECT_DATE"; payload: Date }
  | { type: "CLEAR_SELECTION" };

function reducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, currentMonth: action.payload };

    case "SELECT_DATE": {
      const clicked = action.payload;
      // No start yet → set start
      if (!state.rangeStart) {
        return { ...state, rangeStart: clicked, rangeEnd: null };
      }
      // Start exists but no end
      if (!state.rangeEnd) {
        // If same as start or before start, reset to new start
        if (isSameDay(clicked, state.rangeStart) || isBefore(clicked, state.rangeStart)) {
          return { ...state, rangeStart: clicked, rangeEnd: null };
        }
        return { ...state, rangeEnd: clicked };
      }
      // Both exist → start new selection
      return { ...state, rangeStart: clicked, rangeEnd: null };
    }

    case "CLEAR_SELECTION":
      return { ...state, rangeStart: null, rangeEnd: null };

    default:
      return state;
  }
}

const CalendarContext = createContext<CalendarState | null>(null);
const CalendarDispatchContext = createContext<Dispatch<CalendarAction> | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    currentMonth: new Date(),
    rangeStart: null,
    rangeEnd: null,
  });

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error("useCalendar must be used within CalendarProvider");
  return ctx;
}

export function useCalendarDispatch() {
  const ctx = useContext(CalendarDispatchContext);
  if (!ctx) throw new Error("useCalendarDispatch must be used within CalendarProvider");
  return ctx;
}
