import { cn } from "@/lib/utils";
import { isInRange, isRangeStart, isRangeEnd, type CalendarDay } from "@/core/dateEngine";
import { useCalendar, useCalendarDispatch } from "@/context/CalendarContext";
import React, { useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  day: CalendarDay;
  tabIndex: number;
  onKeyNav: (e: React.KeyboardEvent, date: Date) => void;
}

export function RangeHighlighter({ day, tabIndex, onKeyNav }: Props) {
  const { rangeStart, rangeEnd } = useCalendar();
  const dispatch = useCalendarDispatch();

  const isStart = isRangeStart(day.date, rangeStart);
  const isEnd = isRangeEnd(day.date, rangeEnd);
  const inRange = isInRange(day.date, rangeStart, rangeEnd) && !isStart && !isEnd;

  const handleClick = useCallback(() => {
    dispatch({ type: "SELECT_DATE", payload: day.date });
  }, [dispatch, day.date]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      } else {
        onKeyNav(e, day.date);
      }
    },
    [handleClick, onKeyNav]
  );

  // Build accessible label
  let ariaLabel = day.date.toDateString();
  if (isStart) ariaLabel += ", range start";
  if (isEnd) ariaLabel += ", range end";
  if (inRange) ariaLabel += ", in selected range";
  if (day.isToday) ariaLabel += ", today";

  return (
    <motion.button
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={isStart || isEnd || inRange}
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-date={day.date.toISOString()}
      whileHover={{ scale: day.isCurrentMonth ? 1.15 : 1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full text-sm font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !day.isCurrentMonth && "text-muted-foreground/40",
        day.isCurrentMonth && "text-foreground cursor-pointer",
        day.isToday && !isStart && !isEnd && "ring-2 ring-cal-today font-semibold",
        isStart && "bg-cal-start text-primary-foreground font-bold shadow-md",
        isEnd && "bg-cal-end text-primary-foreground font-bold shadow-md",
        inRange && "bg-cal-range rounded-none",
        !isStart && !isEnd && !inRange && day.isCurrentMonth && "hover:bg-muted"
      )}
    >
      {day.dayNumber}
    </motion.button>
  );
}
