const PREFIX = "cal_notes_";

export function loadNote(key: string): string {
  if (!key) return "";
  try {
    return localStorage.getItem(PREFIX + key) ?? "";
  } catch {
    return "";
  }
}

export function saveNote(key: string, value: string): void {
  if (!key) return;
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch {
    // storage full or unavailable
  }
}
