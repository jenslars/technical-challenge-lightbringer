// Date-related utility functions

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

// Session seed for consistent randomization within a session
let sessionSeed: number | null = null;

/**
 * Initialize session seed if not already set
 */
function initializeSessionSeed(): void {
  if (sessionSeed === null) {
    sessionSeed = Math.floor(Math.random() * 1000000);
  }
}

/**
 * Generate a pseudo-random number based on seed and input
 */
function seededRandom(seed: number, input: number): number {
  const x = Math.sin(seed + input) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate deterministic date based on seed
 */
export function generateRandomDate(daysAgo: number = 30, seed?: number): string {
  const now = new Date();
  
  let finalSeed: number;
  if (seed !== undefined) {
    initializeSessionSeed();
    const randomValue = seededRandom(sessionSeed || 0, seed);
    finalSeed = Math.floor(randomValue * daysAgo);
  } else {
    finalSeed = Math.floor(Math.random() * daysAgo);
  }
  
  const randomDate = new Date(now.getTime() - (finalSeed * MILLISECONDS_PER_DAY));
  
  return randomDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 