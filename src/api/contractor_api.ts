import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface ContractorI {
  id: number;
  caption: string;
  description: string;
}

export const getContractorListApi = async () => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/list', {});
    const list: Partial<ContractorI>[] = data.list;
    return list;
  });
};

export const addContractorApi = async (contractor: Partial<ContractorI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/add', contractor);
    const out: { id: number } = data;
    return out;
  });
};

export const updateContractorApi = async (contractor: Partial<ContractorI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/update', contractor);
    const out: { id: number } = data;
    return out;
  });
};

export const infoContractorApi = async (contractorId: Partial<number>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/get', { id: contractorId });
    const out:Partial<ContractorI> = data;
    return out;
  });
};
