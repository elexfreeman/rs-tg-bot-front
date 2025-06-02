import { useState, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { addCacheLogApi, CacheLogI, updateCacheLogApi} from 'src/api/cacheLog_api';
import { CacheLogItemListForm } from 'src/modules/CacheLog/CacheLogItemListForm';
import CacheLogStore from 'src/store/cacheLog.store';
import CacheLogItemStore from 'src/store/cacheLogItem.store';
import ContractorStore from 'src/store/contractor.store';
import ProjectLogStore from 'src/store/project.store';
import { delay } from 'src/utils';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { addManyCacheLogItemApi } from 'src/api/cacheLogItem_api';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogStore = CacheLogStore.useStore();
  const cacheLogItemStore = CacheLogItemStore.useStore();
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

  const addCacheLogAction = async() => {
    const cacheLog = {
      ...cacheLogStore.info.data,
      project_id: projectStore.info.data?.id,
      contractor_id: contractorStore.info.data?.id,
    }
    cacheLogStore.add = await addCacheLogApi(cacheLog);
    console.log(cacheLogStore.add)
    console.log(cacheLogItemStore.list)
    CacheLogStore.setStore({ ...cacheLogStore, });

    if(cacheLogStore.add.data?.id && cacheLogItemStore.list?.data?.length) {
      const cacheLogItems = cacheLogItemStore.list?.data.map((item) => {
        return {
          ...item,
          cache_log_id: Number(cacheLogStore.add.data?.id),
        }
    });

      cacheLogItemStore.add = await addManyCacheLogItemApi(
        cacheLogItems
      )
    }
    if (cacheLogStore.add.error) {
      routeNavigator.back();
    }
  }

  const updateCacheLogAction = async () => {
    const cacheLog = {
      ...cacheLogStore.info.data,
      project_id: projectStore.info.data?.id,
      contractor_id: contractorStore.info.data?.id,
    }
    cacheLogStore.update = await updateCacheLogApi(cacheLog);
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
    if (cacheLogStore.update.error) {
      routeNavigator.back();
    }
  }

  const onSubmit = async() => {
    await delay();
    if (props.isUpdate) {
      updateCacheLogAction();
    } else {
      addCacheLogAction();
    }
  }
  return (
    <FormLayoutGroup>
      <FormItem top="Название">
        <input id='id' key={cacheLogStore.info.data?.id} defaultValue={cacheLogStore.info.data?.id} hidden />
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
      <CacheLogItemListForm />
      <FormItem>
        <Button onClick={() => onSubmit()}>Сохранить</Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
