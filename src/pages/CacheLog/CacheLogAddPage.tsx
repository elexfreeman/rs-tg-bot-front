import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FormItem,
  SelectMimicry,
  Group,
} from '@vkontakte/vkui';
import { CacheLogAdd } from 'src/modules/CacheLog/CacheLogAdd';
import {
  CacheLogCtrl,
} from 'src/modules/CacheLog/cacheLog_ctrl';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ContractorListSelect } from 'src/modules/Contractor/ContractorListSelect';
import { setModalStore } from 'src/modals/modal.store';
import { Store } from 'src/store/store';

enum PanelView {
  addPage = 'addPage',
  contractorForm = 'contractorForm',
}

export const CacheLogAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();
  const params = useParams<'project_id'>();
  const routeNavigator = useRouteNavigator();

  const onSelect = () => {
    routeNavigator.hideModal();
  }

  useEffect(() => {
    cacheLogCtrl.infoProject(Number(params?.project_id));
  }, []);

  const getContractorSelectorContent = () => {
    return (
      <Panel id={PanelView.contractorForm}>
        <PanelHeader
          before={
            <PanelHeaderBack onClick={() => routeNavigator.hideModal()} />
          }
        >
          Выбор контрагента
        </PanelHeader>
        <Group>
          <ContractorListSelect onSelect={onSelect} />
        </Group>
      </Panel>
    );
  };

  // элемент для выбора внутреннего значения
  const contractorFormField = () => {
    const onShowModal = () => {
      setModalStore({ content: getContractorSelectorContent });
      routeNavigator.showModal('main_modal');
    };
    return (
      <FormItem top="Выберите контрагента">
        <SelectMimicry placeholder="Не выбран" onClick={() => onShowModal()}>
          {Store.getInstance().contractorStore.info.data?.caption}
        </SelectMimicry>
      </FormItem>
    );
  };

  return (
    <Panel {...props} className="Panel__fullScreen">
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => cacheLogCtrl.goBack()} />}
      >
        Новый платеж
      </PanelHeader>
      <CacheLogAdd
        projectId={Number(params?.project_id)}
        contractorForm={contractorFormField()}
      />
    </Panel>
  );
});

CacheLogAddPage.displayName = 'CacheLogAddPage';
