import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface ProjectI {
  id: number;
  caption: string;
  description: string;
}

export const getProjectList = async () => {
  return await Result.catchError(async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/project/list',
      data: {},
    });
    const list: Partial<ProjectI>[] = data.data.list;
    return list;
  });
};

export const addProject = async (project: Partial<ProjectI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/project/add',
      data: project,
    });
    const out: { id: number } = data.data;
    return out;
  });
};

export const updateProject = async (project: Partial<ProjectI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/project/update',
      data: project,
    });
    const out: { id: number } = data.data;
    return out;
  });
};

export const infoProject = async (projectId: Partial<number>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/project/get',
      data: { id: projectId },
    });
    const out:Partial<ProjectI> = data.data;
    return out;
  });
};
