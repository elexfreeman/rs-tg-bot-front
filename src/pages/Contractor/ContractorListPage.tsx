import { FC, memo } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { ContractorList } from 'src/modules/Contractor/ContractorList';

export const ContractorListPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">Контрагенты</PanelHeader>
      <ContractorList />
    </Panel>
  );
});

ContractorListPage.displayName = 'ContractorListPage';
