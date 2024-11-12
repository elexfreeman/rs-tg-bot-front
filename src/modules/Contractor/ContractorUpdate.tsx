import {  useEffect } from 'react';
import {
  Group,
} from '@vkontakte/vkui';
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorI } from 'src/api/contractor_api';
import { ContractorAddEditForm } from 'src/modules/Contractor/ContractorAddEditForm';
import { useContractorStore } from 'src/store/contractor.store';

export const ContractorUpdate = (props: {contractorId: number}) => {
  const contractorStore = useContractorStore();
  const contractorCtrl = ContractorCtrl.getInstance();

  useEffect(() => {
    contractorCtrl.infoContractor(props.contractorId);
  }, []);

  const newContractor: Partial<ContractorI> = {
    ...contractorStore.info.data,
  };

  return (
    <Group description="">
      <ContractorAddEditForm contractor={newContractor} isUpdate />
    </Group>
  );
};

ContractorUpdate.displayName = 'ContractorUpdate';
