import { Result } from 'src/system/error_sys';
import { apiRequset } from './api';

export interface ContractorI {
  id: number;
  caption: string;
  description: string;
}

export const getContractorList = async () => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/list', {});
    const list: Partial<ContractorI>[] = data.list;
    return list;
  });
};

export const addContractor = async (contractor: Partial<ContractorI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/add', contractor);
    const out: { id: number } = data;
    return out;
  });
};

export const updateContractor = async (contractor: Partial<ContractorI>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/update', contractor);
    const out: { id: number } = data;
    return out;
  });
};

export const infoContractor = async (contractorId: Partial<number>) => {
  return await Result.catchError(async () => {
    const data = await apiRequset( '/contractor/get', { id: contractorId });
    const out:Partial<ContractorI> = data;
    return out;
  });
};
