import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';

export const getCacheLogItemDefault = (): CacheLogItemI => {
  return {
    id: 0,
    caption: '',
    cache_log_id: 0,
    price: 0,
    count: 0,
  };
};

export const getCacheLogItemList = async (cacheLogId: number) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/list', {
      cache_log_id: cacheLogId,
    });
    const list: Partial<CacheLogItemI>[] = data.list;
    return list;
  });
};

export const addManyCacheLogItem = async (cacheLogItemList: Partial<CacheLogItemI[]>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/add_many', cacheLogItemList);
    const out: { id: number } = data;
    return out;
  });
};

export const addCacheLogItem = async (cacheLogItem: Partial<CacheLogItemI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/add', cacheLogItem);
    const out: { id: number } = data;
    return out;
  });
};

export const updateCacheLogItem = async (cacheLogItem: Partial<CacheLogItemI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/update', cacheLogItem);
    const out: { id: number } = data;
    return out;
  });
};

