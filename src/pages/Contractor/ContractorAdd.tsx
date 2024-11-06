import { FC, memo } from 'react';
import {NavIdProps, Panel, PanelHeader, Group, PanelHeaderBack } from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorI } from 'src/api/contractor_api';
import { ContractorAddEditForm } from './ContractorAddEditForm';

export const ContractorAdd: FC<NavIdProps> = memo(
  (props: NavIdProps) => {
    const newContractor: ContractorI = {
      id: 0,
      caption: '',
      description: '',
    };

  const contractorCtrl = ContractorCtrl.getInstance();
    return (
      <Panel className="Panel__fullScreen" {...props}>
        <PanelHeader
          delimiter="none"
          before={<PanelHeaderBack onClick={() => contractorCtrl.goBack()} />}
        >
          Новый проект
        </PanelHeader>
        <Group description="">
          <ContractorAddEditForm contractor={newContractor} />
        </Group>
      </Panel>
    );
  }
);

ContractorAdd.displayName = 'ContractorAdd';
