import { FC, memo, useState } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FormItem,
  SelectMimicry,
  View,
  Group,
} from '@vkontakte/vkui';
import { CacheLogAdd } from 'src/modules/CacheLog/CacheLogAdd';
import {
  CacheLogCtrl,
  TSelectContractor,
} from 'src/modules/CacheLog/cacheLog_ctrl';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { ContractorListSelect } from 'src/modules/Contractor/ContractorListSelect';
import {SelectFieldI} from 'src/types';

enum PanelView {
  addPage = 'addPage',
  contractorForm = 'contractorForm',
}

export const CacheLogAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();
  const params = useParams<'project_id'>();
  const [activeView, setActiveView] = useState<PanelView>(PanelView.addPage);
  const [selectedContractor, setSelectedContractor] = useState<SelectFieldI|undefined>();

  let onSelectContractorClick: TSelectContractor | undefined;

  const onSelectContractorFromForm = (contractor: SelectFieldI) => {
    if (onSelectContractorClick) {
      setSelectedContractor(contractor)
      // передача выбраного параметра во внутреннею форму
      onSelectContractorClick(contractor);
    }
    setActiveView(PanelView.addPage);
  };

  const contractorForm = (props: {
    onSelectContractor?: TSelectContractor;
  }) => {
    if (props.onSelectContractor) {
      onSelectContractorClick = props?.onSelectContractor;
    }
    return (
      <FormItem top="Выберите контрагента">
        <SelectMimicry
          placeholder="Не выбрана"
          onClick={() => setActiveView(PanelView.contractorForm)}
        >
          {selectedContractor?.caption}
        </SelectMimicry>
      </FormItem>
    );
  };

  return (
    <View {...props} activePanel={activeView}>
      <Panel id={PanelView.addPage} className="Panel__fullScreen">
        <PanelHeader
          delimiter="none"
          before={<PanelHeaderBack onClick={() => cacheLogCtrl.goBack()} />}
        >
          Новый платеж
        </PanelHeader>
        <CacheLogAdd
          projectId={Number(params?.project_id)}
          contractorForm={contractorForm}
        />
      </Panel>
      <Panel id={PanelView.contractorForm}>
        <PanelHeader
          before={
            <PanelHeaderBack onClick={() => setActiveView(PanelView.addPage)} />
          }
        >
          Выбор контрагента
        </PanelHeader>
        <Group>
          <ContractorListSelect
            selected={selectedContractor}
            onSelectContractor={onSelectContractorFromForm}
          />
        </Group>
      </Panel>
    </View>
  );
});

CacheLogAddPage.displayName = 'CacheLogAddPage';
