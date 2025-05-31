import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Group, CardGrid, ContentCard, CellButton } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ContractorI } from 'src/Entity/ContractorE';
import ContractorStore from 'src/store/contractor.store';
import { getContractorListApi } from 'src/api/contractor_api';
import { Result } from 'src/system/error_sys';

export const ContractorListSelect = (props: { onSelect: () => void }) => {
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();

  const contractorList = async () => {
    contractorStore.list = await getContractorListApi();
    ContractorStore.setStore({ ...contractorStore });
    return contractorStore;
  }

  const goToAddContractor = () => {
    routeNavigator.push(`/ContractorAdd`);
  }

  useEffect(() => {
    contractorList();
  }, []);

  const setInfo = (item: Partial<ContractorI>) => {
    const info = Result.setData(item);
    contractorStore.info = info;
    ContractorStore.setStore({ ...contractorStore });
  }

  const onSelect = (item: Partial<ContractorI>) => {
    setInfo(item)
    props.onSelect();
  }

  const isSelected = (id: number) => {
    return id === contractorStore.info.data?.id;
  };

  return (
    <Group>
      <CardGrid size="l">
        <CellButton
          onClick={() => goToAddContractor()}
          before={<Icon28AddOutline />}
        >
          Добавить контрагента
        </CellButton>
        {contractorStore.list?.data?.map((item) => (
          <ContentCard
            key={item.id}
            onClick={() => onSelect(item)}
            subtitle={isSelected(Number(item.id)) && 'выбран'}
            header={item.caption}
            caption={item.description}
          />
        ))}
      </CardGrid>
    </Group>
  );
};

ContractorListSelect.displayName = 'ContractorListSelect';
