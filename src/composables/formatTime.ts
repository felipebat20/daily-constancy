import { addSeconds, intervalToDuration } from 'date-fns';
import { ref } from 'vue';

export function useFormatSecondsToNow({ seconds: incoming_seconds }: { seconds: number }) {
  const new_seconds = ref(incoming_seconds);

  const interval = ref(intervalToDuration({
    start: new Date(),
    end: addSeconds(new Date(), new_seconds.value),
  }));

  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = interval.value;

  const parsed_hours = years * 365 * 24 + months * 30 * 24 + days * 24 + hours;

  const formatted_hours = parsed_hours.toString().padStart(2, '0');
  const formatted_minutes = minutes.toString().padStart(2, '0');
  const formatted_seconds = seconds.toString().padStart(2, '0');

  return `${formatted_hours}:${formatted_minutes}:${formatted_seconds}`;
}
