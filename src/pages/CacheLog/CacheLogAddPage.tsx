import { FC, memo, useEffect } from 'react';
import ProjectStore from 'src/store/project.store';
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
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ContractorListSelect } from 'src/modules/Contractor/ContractorListSelect';
import { setModalStore } from 'src/modals/modal.store';
import ContractorStore from 'src/store/contractor.store';
import { infoProjectApi } from 'src/api/project_api';
import { delay } from 'src/utils';

enum PanelView {
  addPage = 'addPage',
  contractorForm = 'contractorForm',
}

export const CacheLogAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const params = useParams();
  const projectId = Number(params?.project_id);
  const routeNavigator = useRouteNavigator();
  const contractorStore = ContractorStore.useStore();
  const projectStore = ProjectStore.useStore();

  const onSelectContractor = () => {
    routeNavigator.hideModal();
  };

  const infoProject = async(projectId: number) => {
    projectStore.info = { data: {} };
    ProjectStore.setStore({ ...projectStore });
    await delay();
    projectStore.info = await infoProjectApi(projectId);
    ProjectStore.setStore({ ...projectStore });
  }

  useEffect(() => {
    infoProject(Number(projectId));
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
          <ContractorListSelect onSelect={onSelectContractor} />
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
