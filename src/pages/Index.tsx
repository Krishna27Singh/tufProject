import { CalendarProvider } from "@/context/CalendarContext";
import { CalendarGrid } from "@/features/CalendarView/CalendarGrid";
import { NotesPanel } from "@/features/MemoNotes/NotesPanel";
import { SeasonalHero } from "@/features/CalendarView/SeasonalHero";

export default function Index() {
  return (
    <CalendarProvider>
      <div className="h-screen flex flex-col items-stretch justify-start p-2 sm:p-4 bg-background">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto h-full md:h-[85vh] rounded-2xl shadow-xl overflow-hidden">
          {/* Hero — top on mobile, 5/12 on desktop */}
          <SeasonalHero />
          
          {/* Calendar + notes — bottom on mobile, remaining on desktop */}
          <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-10 md:py-12 w-full md:w-7/12 flex-1 overflow-auto">
            <CalendarGrid />
            <NotesPanel />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
