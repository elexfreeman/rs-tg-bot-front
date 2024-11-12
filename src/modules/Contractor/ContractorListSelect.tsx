import { useEffect } from 'react';
import { Group, CardGrid, ContentCard, CellButton } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import {
  useContractorStore,
} from 'src/store/contractor.store';
import { ContractorI } from 'src/Entity/ContractorE';

export const ContractorListSelect = (props: { onSelect: () => void }) => {
  const contractorCtrl = ContractorCtrl.getInstance();
  const contractorStore = useContractorStore();

  useEffect(() => {
    contractorCtrl.contractorList();
  }, []);

  const onSelect = (item: Partial<ContractorI>) => {
    contractorCtrl.setInfo(item)
    props.onSelect();
  }

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
            onClick={() => onSelect(item)}
            subtitle={contractorCtrl.isSelected(Number(item.id)) && 'выбран'}
            header={item.caption}
            caption={item.description}
          />
        ))}
      </CardGrid>
    </Group>
  );
};

ContractorListSelect.displayName = 'ContractorListSelect';
