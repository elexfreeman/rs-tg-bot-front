import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface CacheLogI {
  id: number;
  caption: string;
  description: string;
}

export const getCacheLogList = async (projectId: number) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/cacheLog/list', {projectId});
    const list: Partial<CacheLogI>[] = data.list;
    return list;
  });
};

export const addCacheLog = async (cacheLog: Partial<CacheLogI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/cacheLog/add', cacheLog);
    const out: { id: number } = data;
    return out;
  });
};

export const updateCacheLog = async (cacheLog: Partial<CacheLogI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/cacheLog/update', cacheLog);
    const out: { id: number } = data;
    return out;
  });
};

export const infoCacheLog = async (cacheLogId: Partial<number>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/cacheLog/get', { id: cacheLogId });
    const out:Partial<CacheLogI> = data;
    return out;
  });
};
