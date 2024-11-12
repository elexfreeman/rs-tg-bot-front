import { useEffect } from 'react';
import {
  Group,
  SimpleCell,
  InfoRow,
  Header,
  Title,
  CellButton,
} from '@vkontakte/vkui';
import { Icon20GearOutline } from '@vkontakte/icons';
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorI } from 'src/api/contractor_api';
import { useContractorStore } from 'src/store/contractor.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ContractorInfo = (props: {
  table?: (contractorId: number) => React.ReactNode;
}) => {
  const contractorStore = useContractorStore();
  const contractorCtrl = ContractorCtrl.getInstance();
  const params = useParams<'contractor_id'>();

  useEffect(() => {
    contractorCtrl.infoContractor(Number(params?.contractor_id));
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
          onClick={() => contractorCtrl.goToUpdateContractor(contractor.id)}
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
