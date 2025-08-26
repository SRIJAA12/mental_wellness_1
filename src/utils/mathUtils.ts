/**
 * Calculate average of numbers array
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

/**
 * Round number to specified decimal places
 */
export function roundTo(number: number, decimals: number = 2): number {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Clamp number between min and max
 */
export function clamp(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max);
}

/**
 * Generate random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate streak from mood entries
 */
export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;
  
  const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (const date of sortedDates) {
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}
