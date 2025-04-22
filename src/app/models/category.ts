export type CategoryType = 'INCOME' | 'EXPENSE';

export interface Category {
  id: string;
  name: string;
  plannedInMonth: number;
  type: CategoryType;
  createdDateTime: string;
}
