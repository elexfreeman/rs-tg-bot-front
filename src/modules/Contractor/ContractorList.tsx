import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import ContractorStore from 'src/store/contractor.store';
import { getContractorListApi } from 'src/api/contractor_api';

export const ContractorList = () => {
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();

  const contractorList = async() => {
    contractorStore.list = await getContractorListApi();
    ContractorStore.setStore({ ...contractorStore });
  }

  const goToInfoContractor = (contractorId?: number) => {
    routeNavigator.push(`/ContractorUpdate/${contractorId}`);
  }

  const goToAddContractor = () => {
    routeNavigator.push(`/ContractorAdd`);
  }

  useEffect(() => {
    contractorList();
  }, []);

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
            onClick={() => goToInfoContractor(item.id)}
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
