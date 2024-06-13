import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function determineReadtime(string) {
  const averageWordsPerMinute = 200;

  const wordcount = string.split(" ").length;

  const minutes = wordcount / averageWordsPerMinute;

  return Math.floor(minutes);
}
