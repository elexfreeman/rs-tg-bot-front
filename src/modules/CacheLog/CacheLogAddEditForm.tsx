import { useState, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { addCacheLogApi, CacheLogI, updateCacheLogApi} from 'src/api/cacheLog_api';
import CacheLogStore from 'src/store/cacheLog.store';
import ContractorStore from 'src/store/contractor.store';
import ProjectLogStore from 'src/store/project.store';
import { delay } from 'src/utils';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
  cacheLogItemListForm: React.ReactNode;
}) => {
  const cacheLogStore = CacheLogStore.useStore();
  const projectStore = ProjectLogStore.useStore();
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();

  const [updateData, setUpdateData] = useState<Partial<CacheLogI>>({});

  useEffect(() => {
    setUpdateData(cacheLogStore.info?.data || {});
  }, [cacheLogStore.info?.data]);

  const onUpdateData = (field: keyof CacheLogI, data: any) => {
    updateData[field] = data;
    setUpdateData({ ...updateData });
  };

  const addCacheLog = async(cacheLog: Partial<CacheLogI>) => {
    cacheLogStore.add = await addCacheLogApi(cacheLog);
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
    if (cacheLogStore.add.error) {
      routeNavigator.back();
    }
  }

  const updateCacheLog = async (cacheLog: Partial<CacheLogI>) => {
    cacheLogStore.update = await updateCacheLogApi(cacheLog);
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
    if (cacheLogStore.update.error) {
      routeNavigator.back();
    }
  }

  const onSubmit = async(isUpdate?: boolean) => {
    await delay();
    if (isUpdate) {
      updateCacheLog({
        ...cacheLogStore.info.data,
        project_id: projectStore.info.data?.id,
        contractor_id: contractorStore.info.data?.id,
      });
    } else {
      addCacheLog({
        ...cacheLogStore.info.data,
        project_id: projectStore.info.data?.id,
        contractor_id: contractorStore.info.data?.id,
      });
    }
  }
  return (
    <FormLayoutGroup>
      <FormItem htmlFor="caption" top="Название">
        <Input
          id="caption"
          key={cacheLogStore.info.data?.caption}
          defaultValue={cacheLogStore.info.data?.caption}
          onChange={(event) => onUpdateData('caption', event.target.value)}
        />
      </FormItem>
      <FormItem top="Описание">
        <Textarea
          placeholder="Описание проекта..."
          key={cacheLogStore.info.data?.description}
          defaultValue={ cacheLogStore.info.data?.description }
          onChange={(event) => onUpdateData('description', event.target.value)}
        />
      </FormItem>
      {props.contractorForm && props.contractorForm}
      {props.cacheLogItemListForm && props.cacheLogItemListForm}
      <FormItem>
        <Button onClick={() => onSubmit()}>Сохранить</Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
