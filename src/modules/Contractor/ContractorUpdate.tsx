import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorAddEditForm } from 'src/modules/Contractor/ContractorAddEditForm';
import { useContractorStore } from 'src/store/contractor.store';

export const ContractorUpdate = (props: { contractorId: number }) => {
  const contractorStore = useContractorStore();

  useEffect(() => {
  const contractorCtrl = ContractorCtrl.getInstance();
    contractorCtrl.infoContractor(props.contractorId);
  }, []);

  return (
    <Group description="">
      <ContractorAddEditForm
        contractor={contractorStore.info.data}
        isUpdate
      />
    </Group>
  );
};

ContractorUpdate.displayName = 'ContractorUpdate';
