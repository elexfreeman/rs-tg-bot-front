export interface CacheLogItemI {
  id?: number;
  cache_log_id: number;
  caption: string;
  price: number;
  count: number;
}

export const cacheLogItemDefault: CacheLogItemI = {
  cache_log_id: 0,
  caption: '',
  price: 0,
  count: 0,
}