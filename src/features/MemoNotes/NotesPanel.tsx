import { useNotes } from "./useNotes";
import { useCalendar } from "@/context/CalendarContext";
import { Label } from "@/shared/ui/Typography";
import { format } from "date-fns";
import { StickyNote, Eye, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { CalButton } from "@/shared/ui/Button";

export function NotesPanel() {
  const { text, save, hasSelection } = useNotes();
  const { rangeStart, rangeEnd } = useCalendar();
  const [previewing, setPreviewing] = useState(false);

  const rangeLabel =
    rangeStart && rangeEnd
      ? `${format(rangeStart, "MMM d")} – ${format(rangeEnd, "MMM d, yyyy")}`
      : rangeStart
      ? format(rangeStart, "MMMM d, yyyy")
      : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={rangeLabel ?? "empty"}
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-accent" />
            <Label>Notes</Label>
          </div>

          {hasSelection && text.trim().length > 0 && (
            <CalButton
              onClick={() => setPreviewing(!previewing)}
              aria-label={previewing ? "Edit note" : "Preview note as markdown"}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              {previewing ? (
                <>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Preview
                </>
              )}
            </CalButton>
          )}
        </div>

        {rangeLabel && (
          <p className="font-body text-sm text-muted-foreground">{rangeLabel}</p>
        )}

        {/* Edit / Preview toggle */}
        {previewing && hasSelection ? (
          <div className="prose prose-sm max-w-none rounded-md border border-input bg-background p-3 font-body text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={text}
            onChange={(e) => {
              save(e.target.value);
              if (previewing) setPreviewing(false);
            }}
            disabled={!hasSelection}
            placeholder={
              hasSelection
                ? "Write a note… supports **markdown**, lists, and [links](url)"
                : "Select a date to add notes"
            }
            aria-label={hasSelection ? `Note for ${rangeLabel}` : "No date selected"}
            className="min-h-[120px] w-full resize-y rounded-md border border-input bg-background p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
