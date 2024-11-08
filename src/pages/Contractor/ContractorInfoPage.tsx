import { FC, memo } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { ContractorInfo } from 'src/modules/Contractor/ContractorInfo';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';

export const ContractorInfoPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const contractorCtrl = ContractorCtrl.getInstance();

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => contractorCtrl.goBack()} />}
      >
        Контрагент
      </PanelHeader>
      <ContractorInfo />
    </Panel>
  );
});

ContractorInfoPage.displayName = 'ContractorInfoPage';
