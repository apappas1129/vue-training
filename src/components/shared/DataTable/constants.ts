const ariaSortMap = {
  default: 'none',
  asc: 'ascending',
  desc: 'descending',
} as const;

const sortIconMap = {
  default: 'sort?',
  asc: 'asc',
  desc: 'desc',
} as const;

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

export { ariaSortMap, sortIconMap, DEFAULT_PAGE_SIZES };
