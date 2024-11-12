import { useEffect } from 'react';
import {
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import { useContractorStore } from 'src/store/contractor.store';

export const ContractorList = () => {
  const contractorCtrl = ContractorCtrl.getInstance();
  const contractorStore = useContractorStore();

  useEffect(() => {
    contractorCtrl.contractorList();
  }, []);

  return (
    <Group>
      <CardGrid size="l">
        <CellButton
          onClick={() => contractorCtrl.goToAddContractor()}
          before={<Icon28AddOutline />}
        >
          Добавить контрагента
        </CellButton>
        {contractorStore.list?.data?.map((item) => (
          <ContentCard
            key={item.id}
            onClick={() => contractorCtrl.goToInfoContractor(item.id)}
            subtitle=""
            header={item.caption}
            caption={item.description}
          />
        ))}
      </CardGrid>
    </Group>
  );
};

ContractorList.displayName = 'ContractorList';
