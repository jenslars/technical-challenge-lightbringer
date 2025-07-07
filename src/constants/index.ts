// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  MAX_POSTS: 150, // DummyJSON has 150 posts total
  REQUEST_TIMEOUT: 10000, // 10 seconds
} as const;

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300, // milliseconds
  MAX_SEARCH_RESULTS: 50
} as const; 