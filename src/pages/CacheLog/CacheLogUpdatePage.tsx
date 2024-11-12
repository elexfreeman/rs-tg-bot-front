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
import { CacheLogUpdate } from 'src/modules/CacheLog/CacheLogUpdate';
import { CacheLogCtrl } from 'src/modules/CacheLog/cacheLog_ctrl';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ContractorListSelect } from 'src/modules/Contractor/ContractorListSelect';
import { setModalStore } from 'src/modals/modal.store';
import { useCacheLogStore } from 'src/store/cacheLog.store';
import { useContractorStore } from 'src/store/contractor.store';

export const CacheLogUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();
  const params = useParams();
  const projectId = Number(params?.project_id);
  const cacheLogId = Number(params?.cache_log_id);
  const contractorStore = useContractorStore();
  const cacheLogStore = useCacheLogStore();

  // заполняем инфу о проекте и затратах
  useEffect(() => {
    cacheLogCtrl.infoProject(projectId);
    cacheLogCtrl.infoCacheLog(cacheLogId, projectId);
  }, []);

  // заполняем инфу о контрагенте если есть id
  const contractorId = cacheLogStore.info.data?.contractor_id;
  useEffect(() => {
    if (contractorId) {
      cacheLogCtrl.infoContractor(contractorId);
    }
  }, [contractorId]);

  const routeNavigator = useRouteNavigator();
  const onSelect = () => {
    routeNavigator.hideModal();
  };

  const getContractorSelectorContent = () => {
    return (
      <Panel>
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

  const onShowModal = () => {
    setModalStore({ content: getContractorSelectorContent });
    routeNavigator.showModal('main_modal');
  };

  // элемент для выбора внутреннего значения
  const contractorFormField = () => {
    return (
      <FormItem top="Выберите контрагента">
        <SelectMimicry placeholder="Не выбран" onClick={() => onShowModal()}>
          {contractorStore.info.data?.caption}
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
        Редактировать платеж
      </PanelHeader>
      <CacheLogUpdate
        cacheLogId={cacheLogId}
        projectId={projectId}
        contractorForm={contractorFormField()}
      />
    </Panel>
  );
});

CacheLogUpdatePage.displayName = 'CacheLogAddPage';
