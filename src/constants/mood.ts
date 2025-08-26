// Mood values and labels
export const MOOD_VALUES = {
  SAD: 1,
  NEUTRAL: 2,
  GOOD: 3,
  HAPPY: 4
} as const;

export const MOOD_LABELS = {
  [MOOD_VALUES.SAD]: 'Sad',
  [MOOD_VALUES.NEUTRAL]: 'Neutral',
  [MOOD_VALUES.GOOD]: 'Good',
  [MOOD_VALUES.HAPPY]: 'Happy'
} as const;

export const MOOD_EMOJIS = {
  [MOOD_VALUES.SAD]: '😔',
  [MOOD_VALUES.NEUTRAL]: '😐',
  [MOOD_VALUES.GOOD]: '🙂',
  [MOOD_VALUES.HAPPY]: '😊'
} as const;

export const MOOD_COLORS = {
  [MOOD_VALUES.SAD]: '#f56565',
  [MOOD_VALUES.NEUTRAL]: '#ed8936',
  [MOOD_VALUES.GOOD]: '#4299e1',
  [MOOD_VALUES.HAPPY]: '#48bb78'
} as const;

// Activities
export const COMMON_ACTIVITIES = [
  '💼 Work', '🏃‍♂️ Exercise', '👥 Social', '👨‍👩‍👧‍👦 Family',
  '😴 Rest', '🎨 Creative', '📚 Learning', '🌳 Outdoor',
  '🍽️ Eating', '🎵 Music', '📺 Entertainment', '🧘‍♀️ Meditation'
] as const;

// Analytics
export const DEFAULT_ANALYTICS_RANGE = 30; // days
export const MAX_MOOD_ENTRIES_DISPLAY = 100;
export const MIN_ENTRIES_FOR_ANALYTICS = 3;
