import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface CacheLogI {
  id: number;
  project_id: number;
  contractor_id: number;
  caption: string;
  description: string;
}

export const getCacheLogDefault = (): CacheLogI => {
  return {
    id: 0,
    caption: '',
    description: '',
    project_id: 0,
    contractor_id: 0,
  };
};

export const getCacheLogListApi = async (projectId: number) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log/list', { project_id: projectId });
    const list: Partial<CacheLogI>[] = data.list;
    return list;
  });
};

export const addCacheLogApi = async (cacheLog: Partial<CacheLogI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log/add', cacheLog);
    const out: { id: number } = data;
    return out;
  });
};

export const updateCacheLogApi = async (cacheLog: Partial<CacheLogI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log/update', cacheLog);
    const out: { id: number } = data;
    return out;
  });
};

export const infoCacheLogApi = async (cacheLogId?: number, projectId?: number) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/cache_log/get', { id: cacheLogId, project_id: projectId });
    const out: Partial<CacheLogI> = data;
    return out;
  });
};
