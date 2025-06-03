export type SortOrder = 'asc' | 'desc';

export const sortByField = <T>(
  array: T[],
  field: keyof T,
  order: SortOrder = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
};

export const filterByField = <T>(
  array: T[],
  field: keyof T,
  value: any
): T[] => {
  return array.filter((item) => item[field] === value);
};
