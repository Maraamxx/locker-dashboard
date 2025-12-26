// Simple in-memory cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData(key) {
  const cached = cache.get(key);
  if (!cached) return null;

  const { data, timestamp } = cached;
  const isExpired = Date.now() - timestamp > CACHE_DURATION;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return data;
}

export function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(key) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}
