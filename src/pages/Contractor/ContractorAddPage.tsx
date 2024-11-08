import { FC, memo } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ContractorAdd } from 'src/modules/Contractor/ContractorAdd';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';

export const ContractorAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const contractorCtrl = ContractorCtrl.getInstance();
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => contractorCtrl.goBack()} />}
      >
        Новый контагент
      </PanelHeader>
      <ContractorAdd />
    </Panel>
  );
});

ContractorAddPage.displayName = 'ContractorAddPage';
