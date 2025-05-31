import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { ContractorAddEditForm } from 'src/modules/Contractor/ContractorAddEditForm';
import ContractorStore from 'src/store/contractor.store';
import { delay } from 'src/utils';
import { infoContractorApi } from 'src/api/contractor_api';

export const ContractorUpdate = (props: { contractorId: number }) => {
  const contractorStore = ContractorStore.useStore();

  const infoContractor = async(contractorId: number) => {
    contractorStore.info = { data: {} };
    ContractorStore.setStore({ ...contractorStore });
    await delay();
    contractorStore.info = await infoContractorApi(contractorId);
    ContractorStore.setStore({ ...contractorStore });
  }

  useEffect(() => {
    infoContractor(props.contractorId);
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
