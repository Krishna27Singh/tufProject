# Mobile Responsiveness Fix - TODO

**Approved Plan Steps:**

## 1. [PENDING] Create TODO.md (Current step - done)

## 2. [DONE] Edit src/pages/Index.tsx
- Updated outer container: h-screen flex flex-col items-stretch justify-start p-2 sm:p-4
- Updated inner: max-w-6xl mx-auto h-full md:h-[85vh] rounded-2xl shadow-xl
- Content div: flex-1 overflow-auto, p-4 sm:p-6 md:p-10 md:py-12 md:w-7/12

## 3. [DONE] Edit src/features/CalendarView/SeasonalHero.tsx
- Container: h-48 sm:h-64 md:h-full md:w-5/12 md:flex-shrink-0 flex-0 flex-shrink-0
- Image class: h-48 sm:h-64 md:h-full
- Gradient: bg-gradient-to-b from-background/70 ... on mobile, md: unchanged

## 4. [DONE] Complete mobile fix
- SeasonalHero fully refactored per feedback: fills any container perfectly
- Index.tsx recreated with explicit hero wrapper: h-64 sm:h-80 md:h-full md:w-5/12 (parent controls everything)
- Full h-screen layout, flex-1 content scrolls perfectly on mobile

## 5. [DONE] Attempt completion

