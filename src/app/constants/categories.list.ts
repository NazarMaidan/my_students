import {
  COUNTRY,
  COUNTRY_ADVANCED,
  UKR_TO_ENG,
  MATH,
  MATH_ADVANCED,
  RANDOM,
  SPELL,
  BIRTHDAY,
  END_TO_UKR,
  DAYS,
  PAST,
  PAST_ADVANCED,
  FOOD,
  FOOD_ADVANCED,
  MISS,
  GRADES,
  GRADES_ADVANCED,
  RANDOM_ADVANCED,
  QUESTION_WORD
} from './question.list';

export const CATEGORIES = [
  { name: 'Country', id: 1, points: 1 },
  { name: 'Country*', id: 1_000, points: 2 },
  { name: 'spell', id: 3, points: 1 },
  { name: 'Ukr --> Eng', id: 4, points: 2 },
  { name: 'Math', id: 5, points: 1 },
  { name: 'Math*', id: 5_000, points: 2 },
  { name: 'Random word', id: 6, points: 1 },
  { name: 'Random word*', id: 6_000, points: 2 },
  { name: 'Birthday', id: 7, points: 2 },
  { name: 'Eng --> Ukr', id: 8, points: 1 },
  { name: 'Days', id: 9, points: 1 },
  { name: 'Past', id: 10, points: 1 },
  { name: 'Past*', id: 10_000, points: 2 },
  { name: 'Food', id: 11, points: 1 },
  { name: 'Food*', id: 11_000, points: 2 },
  { name: 'Ступені порівняння', id: 12, points: 1 },
  { name: 'Ступені порівняння*', id: 12_000, points: 2 },
  { name: 'Miss', id: 22, points: 1 },
  { name: 'Question', id: 13, points: 2 },
  { name: 'Question', id: 14, points: 1 }, // 2 class
];

export const CATEGORY_BY_CLASS: {[key: number]: number[]} = {
  2:[3, 5, 9, 14],
  3:[3, 4, 5, 6, 6_000, 7, 8, 9, 11, 11_000, 22, 13],
  4:[1, 1_000, 3, 4, 5, 6, 6_000, 7, 8, 9, 10, 10_000, 11, 11_000, 12, 12_000, 22, 13]
}

export const QUESTIONS = {
  1: COUNTRY,
  1_000: COUNTRY_ADVANCED,
  3: SPELL,
  4: UKR_TO_ENG,
  5: MATH,
  5_000: MATH_ADVANCED,
  6: RANDOM,
  6_000: RANDOM_ADVANCED,
  7: BIRTHDAY,
  8: END_TO_UKR,
  9: DAYS,
  10: PAST,
  10_000: PAST_ADVANCED,
  11: FOOD,
  11_000: FOOD_ADVANCED,
  12: GRADES,
  12_000: GRADES_ADVANCED,
  13: QUESTION_WORD,
  14: QUESTION_WORD,
  22: MISS,
}
