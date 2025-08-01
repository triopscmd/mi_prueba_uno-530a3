```typescript
// Helper to ensure input is a Date object and handle invalid inputs gracefully
const toDate = (dateInput: Date | string): Date => {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${dateInput}`);
  }
  return date;
};

// Helper to get a date at the start of its day (local time)
const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Formats a date into a human-readable string.
 * It intelligently displays "Today", "Tomorrow", "Yesterday" for recent dates,
 * otherwise, it formats as "Mon DD, YYYY".
 * @param dateInput The date to format (Date object or ISO 8601 string).
 * @returns Formatted date string.
 */
export const formatDisplayDate = (dateInput: Date | string): string => {
  const date = toDate(dateInput);
  const today = startOfDay(new Date());
  const targetDate = startOfDay(date);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays === -1) {
    return 'Yesterday';
  } else {
    // Format for other dates, e.g., "Jan 25, 2024"
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};

/**
 * Calculates the number of full days between two dates.
 * The calculation is based on the difference between the start of the days (local time).
 * @param date1Input The first date (Date object or ISO 8601 string).
 * @param date2Input The second date (Date object or ISO 8601 string).
 * @returns The number of days between the two dates (absolute value).
 */
export const getDaysBetweenDates = (date1Input: Date | string, date2Input: Date | string): number => {
  const date1 = startOfDay(toDate(date1Input));
  const date2 = startOfDay(toDate(date2Input));

  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Checks if a given date falls on the current day (local time).
 * @param dateInput The date to check (Date object or ISO 8601 string).
 * @returns True if the date is today, false otherwise.
 */
export const isToday = (dateInput: Date | string): boolean => {
  const date = startOfDay(toDate(dateInput));
  const today = startOfDay(new Date());
  return date.getTime() === today.getTime();
};

/**
 * Checks if a given date falls on the next day (tomorrow, local time).
 * @param dateInput The date to check (Date object or ISO 8601 string).
 * @returns True if the date is tomorrow, false otherwise.
 */
export const isTomorrow = (dateInput: Date | string): boolean => {
  const date = startOfDay(toDate(dateInput));
  const tomorrow = startOfDay(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getTime() === tomorrow.getTime();
};

/**
 * Checks if a given date is in the past relative to the current day (local time).
 * @param dateInput The date to check (Date object or ISO 8601 string).
 * @returns True if the date is in the past, false otherwise.
 */
export const isPast = (dateInput: Date | string): boolean => {
  const date = startOfDay(toDate(dateInput));
  const today = startOfDay(new Date());
  return date.getTime() < today.getTime();
};

/**
 * Converts an ISO 8601 date string to a Date object.
 * This function handles parsing of standard ISO 8601 date strings.
 * @param isoString The ISO 8601 date string (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ").
 * @returns A Date object.
 * @throws Error if the string is not a valid ISO date string.
 */
export const parseISOString = (isoString: string): Date => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date string: ${isoString}`);
  }
  return date;
};

/**
 * Formats a Date object or string into a full ISO 8601 string (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ").
 * This is typically used for consistent data interchange with APIs.
 * @param dateInput The date to format (Date object or ISO 8601 string).
 * @returns A full ISO 8601 date string.
 */
export const toISOString = (dateInput: Date | string): string => {
  return toDate(dateInput).toISOString();
};

/**
 * Formats a Date object or string into a 'YYYY-MM-DD' string, suitable for HTML date inputs.
 * This format represents the local date.
 * @param dateInput The date to format (Date object or ISO 8601 string).
 * @returns A date string in 'YYYY-MM-DD' format.
 */
export const toYYYYMMDD = (dateInput: Date | string): string => {
  const date = toDate(dateInput);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};