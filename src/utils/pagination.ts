export const generatePaginationNumbers = ({
  currentPage,
  totalPages,
  maxPages = 5,
}: {
  currentPage: number;
  totalPages: number;
  maxPages?: number;
}) => {
  if (totalPages <= maxPages)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= 3) return [1, 2, 3, '...', totalPages - 1, totalPages];

  if (currentPage >= totalPages - 2)
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
