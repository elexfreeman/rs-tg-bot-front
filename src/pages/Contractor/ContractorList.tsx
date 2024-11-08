import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ContractorCtrl } from './contractor_ctrl';
import { useContractorStore } from 'src/store/contractor.store';

export const ContractorList: FC<NavIdProps> = memo((props: NavIdProps) => {
  const contractorCtrl = ContractorCtrl.getInstance();
  const contractorStore = useContractorStore();

  useEffect(() => {
    contractorCtrl.contractorList();
  }, []);

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">Контрагенты</PanelHeader>
      <Group>
        <CardGrid size="l">
          <CellButton
            onClick={() => contractorCtrl.goToAddContractor()}
            before={<Icon28AddOutline />}
          >
            Добавить контрагент
          </CellButton>
          {contractorStore.list?.data?.map((item) => (
            <ContentCard
              key={item.id}
              onClick={() => contractorCtrl.goToUpdateContractor(item.id)}
              subtitle=""
              header={item.caption}
              caption={item.description}
            />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
});

ContractorList.displayName = 'Contractor';
