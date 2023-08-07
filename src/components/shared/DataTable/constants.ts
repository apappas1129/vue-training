const ariaSortMap = {
  default: 'none',
  asc: 'ascending',
  desc: 'descending',
} as const;

/** Remixicon icon names */
const sortIconMap = {
  default: 'expand-up-down-fill',
  asc: 'sort-asc',
  desc: 'sort-desc',
} as const;

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

export { ariaSortMap, sortIconMap, DEFAULT_PAGE_SIZES };
