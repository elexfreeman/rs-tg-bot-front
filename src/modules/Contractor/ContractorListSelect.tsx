import { useEffect } from 'react';
import { Group, CardGrid, ContentCard, CellButton } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import { useContractorStore } from 'src/modules/Contractor/contractor.store';
import { SelectFieldI } from 'src/types';

export const ContractorListSelect = (props: {
  onSelectContractor: (contractor: SelectFieldI) => void;
  selected?: SelectFieldI;
}) => {
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
            onClick={() =>
              props.onSelectContractor({
                id: item.id,
                caption: item.caption,
              })
            }
            subtitle={props?.selected?.id===item.id && 'выбран'}
            header={item.caption}
            caption={item.description}
          />
        ))}
      </CardGrid>
    </Group>
  );
};

ContractorListSelect.displayName = 'ContractorList';
