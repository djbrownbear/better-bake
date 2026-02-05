// Feature flags and configuration
export const config = {
  // Set to true to use real backend API, false to use mock data
  USE_REAL_API: import.meta.env.VITE_USE_REAL_API === 'true',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
} as const;
