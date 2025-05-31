import { useEffect } from 'react';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import {
  Group,
  SimpleCell,
  InfoRow,
  Header,
  Title,
  CellButton,
} from '@vkontakte/vkui';
import { Icon20GearOutline } from '@vkontakte/icons';
import { ContractorI, infoContractorApi } from 'src/api/contractor_api';
import ContractorStore from 'src/store/contractor.store';
import { delay } from 'src/utils';

export const ContractorInfo = (props: {
  table?: (contractorId: number) => React.ReactNode;
}) => {
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();
  const params = useParams<'contractor_id'>();

  const infoContractor = async (contractorId: number) => {
    contractorStore.info = { data: {} };
    ContractorStore.setStore({ ...contractorStore });
    await delay();
    contractorStore.info = await infoContractorApi(contractorId);
    ContractorStore.setStore({ ...contractorStore });
  }

  const goToUpdateContractor = (contractorId?: number) => {
    routeNavigator.push(`/ContractorUpdate/${contractorId}`);
  }

  useEffect(() => {
    infoContractor(Number(params?.contractor_id));
  }, []);

  const contractor: Partial<ContractorI> = {
    ...contractorStore.info.data,
  };

  return (
    <>
      <Group>
        <SimpleCell multiline>
          <Title level="2">{contractor.caption}</Title>
        </SimpleCell>
      </Group>
      <Group header={<Header mode="secondary">Информация о проекте</Header>}>
        <SimpleCell multiline>
          <InfoRow header="Общий бюджет">3000 р.</InfoRow>
        </SimpleCell>
        <SimpleCell multiline>{contractor.description}</SimpleCell>
        <CellButton
          onClick={() => goToUpdateContractor(contractor.id)}
          before={<Icon20GearOutline />}
        >
          Настроить проект
        </CellButton>
      </Group>
      {contractor.id && props.table && props.table(Number(contractor.id))}
      <div style={{ padding: '100px 0' }}></div>
    </>
  );
};

ContractorInfo.displayName = 'ContractorInfo';
