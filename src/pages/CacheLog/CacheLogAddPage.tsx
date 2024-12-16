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
import { CacheLogItemListForm } from 'src/modules/CacheLogItem/CacheLogItemListForm';
import { CacheLogCtrl } from 'src/modules/CacheLog/cacheLog_ctrl';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
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
  const projectCtrl = ProjectCtrl.getInstance();
  const params = useParams();
  const projectId = Number(params?.project_id);
  const routeNavigator = useRouteNavigator();

  const onSelect = () => {
    routeNavigator.hideModal();
  };

  useEffect(() => {
    projectCtrl.infoProject(Number(projectId));
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

  const cacheLogItemListForm = () => {
    return <CacheLogItemListForm />;
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
        cacheLogItemListForm={cacheLogItemListForm()}
      />
    </Panel>
  );
});

CacheLogAddPage.displayName = 'CacheLogAddPage';
