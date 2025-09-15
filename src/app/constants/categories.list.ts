import { CategoryQuestions } from './question.list';

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
  3:[3, 5, 9, 14],
  4:[3, 4, 5, 6, 6_000, 7, 8, 9, 11, 11_000, 22, 13],
  5:[1, 1_000, 3, 4, 5, 6, 6_000, 7, 8, 9, 10, 10_000, 11, 11_000, 12, 12_000, 22, 13]
}

export const QUESTIONS = {
  1: CategoryQuestions.COUNTRY,
  1_000: CategoryQuestions.COUNTRY_ADVANCED,
  3: CategoryQuestions.SPELL,
  4: CategoryQuestions.UKR_TO_ENG,
  5: CategoryQuestions.MATH,
  5_000: CategoryQuestions.MATH_ADVANCED,
  6: CategoryQuestions.RANDOM,
  6_000: CategoryQuestions.RANDOM_ADVANCED,
  7: CategoryQuestions.BIRTHDAY,
  8: CategoryQuestions.END_TO_UKR,
  9: CategoryQuestions.DAYS,
  10: CategoryQuestions.PAST,
  10_000: CategoryQuestions.PAST_ADVANCED,
  11: CategoryQuestions.FOOD,
  11_000: CategoryQuestions.FOOD_ADVANCED,
  12: CategoryQuestions.GRADES,
  12_000: CategoryQuestions.GRADES_ADVANCED,
  13: CategoryQuestions.QUESTION_WORD,
  14: CategoryQuestions.QUESTION_WORD,
  22: CategoryQuestions.MISS,
}
