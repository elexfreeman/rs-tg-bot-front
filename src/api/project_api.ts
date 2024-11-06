import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface ProjectI {
  id: number;
  caption: string;
  description: string;
}

export const getProjectList = async () => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/project/list', {});
    const list: Partial<ProjectI>[] = data.list;
    return list;
  });
};

export const addProject = async (project: Partial<ProjectI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset('/project/add', project);
    const out: { id: number } = data;
    return out;
  });
};

export const updateProject = async (project: Partial<ProjectI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/project/update', project);
    const out: { id: number } = data;
    return out;
  });
};

export const infoProject = async (projectId: Partial<number>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/project/get', { id: projectId });
    const out:Partial<ProjectI> = data;
    return out;
  });
};
