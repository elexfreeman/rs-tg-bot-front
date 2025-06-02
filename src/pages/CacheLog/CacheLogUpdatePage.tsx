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
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ContractorListSelect } from 'src/modules/Contractor/ContractorListSelect';
import { setModalStore } from 'src/modals/modal.store';
import ContractorStore from 'src/store/contractor.store';
import ProjectStore from 'src/store/project.store';
import CacheLogStore from 'src/store/cacheLog.store';
import { infoProjectApi } from 'src/api/project_api';
import { delay } from 'src/utils';
import { infoCacheLogApi } from 'src/api/cacheLog_api';
import { infoContractorApi } from 'src/api/contractor_api';

export const CacheLogUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const params = useParams();
  const projectId = Number(params?.project_id);
  const cacheLogId = Number(params?.cache_log_id);
  const contractorStore = ContractorStore.useStore();
  const cacheLogStore = CacheLogStore.useStore();
  const projectStore = ProjectStore.useStore();

  const infoProject = async (projectId: number) => {
    projectStore.info = { data: {} };
    ProjectStore.setStore({ ...projectStore });
    await delay();
    projectStore.info = await infoProjectApi(projectId);
    ProjectStore.setStore({ ...projectStore });
  }

  const infoCacheLog = async (cacheLogId: number, projectId: number) => {
    cacheLogStore.info = { data: {} };
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
    await delay();
    cacheLogStore.info = await infoCacheLogApi(
      cacheLogId,
      projectId
    );
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
  }

  const infoContractor = async (contractorId: number) => {
    contractorStore.info = { data: {} };
    ContractorStore.setStore({ ...contractorStore });
    await delay();
    contractorStore.info = await infoContractorApi(contractorId);
    ContractorStore.setStore({ ...contractorStore });
  }

  // заполняем инфу о проекте и затратах
  useEffect(() => {
    infoProject(projectId);
    infoCacheLog(cacheLogId, projectId);
  }, []);

  // заполняем инфу о контрагенте если есть id
  const contractorId = cacheLogStore.info.data?.contractor_id;
  useEffect(() => {
    if (contractorId) {
      infoContractor(contractorId);
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

  const goBack = () => {
    routeNavigator.back();
  }

  return (
    <Panel {...props} className="Panel__fullScreen">
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => goBack()} />}
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
