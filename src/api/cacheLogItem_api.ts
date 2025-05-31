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

export const getCacheLogItemListApi = async (cacheLogId: number) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/list', {
      cache_log_id: cacheLogId,
    });
    const list: Partial<CacheLogItemI>[] = data.list;
    return list;
  });
};

export const addManyCacheLogItemApi = async (cacheLogItemList: Partial<CacheLogItemI[]>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/add_many', cacheLogItemList);
    const out: { id: number } = data;
    return out;
  });
};

export const addCacheLogItemApi = async (cacheLogItem: Partial<CacheLogItemI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/add', cacheLogItem);
    const out: { id: number } = data;
    return out;
  });
};

export const updateCacheLogItemApi = async (cacheLogItem: Partial<CacheLogItemI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log_item/update', cacheLogItem);
    const out: { id: number } = data;
    return out;
  });
};

