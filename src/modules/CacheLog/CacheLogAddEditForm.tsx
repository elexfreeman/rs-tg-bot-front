import { useState, useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { delay } from 'src/utils';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import {
  addCacheLogApi as addHeadApi,
  CacheLogI as HeadI,
  updateCacheLogApi as updateTableApi
} from 'src/api/cacheLog_api';
import { upsertManyCacheLogItemApi as upsertManyTableApi } from 'src/api/cacheLogItem_api';
import { CacheLogItemListForm as TableForm } from 'src/modules/CacheLog/CacheLogItemListForm';
import HeadStore from 'src/store/cacheLog.store';
import TableStore from 'src/store/cacheLogItem.store';

import ContractorStore from 'src/store/contractor.store';
import ProjectLogStore from 'src/store/project.store';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<HeadI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const headStore = HeadStore.useStore();
  const [headData, setHeadData] = useState<Partial<HeadI>>({});
    const tableStore = TableStore.useStore();

  const projectStore = ProjectLogStore.useStore();
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    setHeadData(headStore.info?.data || {});
  }, [headStore.info?.data]);

  const updateDataAction = (field: keyof HeadI, data: any) => {
    headData[field] = data;
    setHeadData({ ...headData });
  };

  const addHeadAction = async() => {
    const head = {
      ...headStore.info.data,
      project_id: projectStore.info.data?.id,
      contractor_id: contractorStore.info.data?.id,
    }
    headStore.add = await addHeadApi(head);
    HeadStore.setStore({ ...headStore, });

    if(headStore.add.data?.id && tableStore.list?.data?.length) {
      const cacheLogItems = tableStore.list?.data.map((item) => {
        return {
          ...item,
          cache_log_id: Number(headStore.add.data?.id),
        }
      });

      tableStore.add = await upsertManyTableApi(
        cacheLogItems
      );
    }
    routeNavigator.back();

    if (headStore.add.error) {
      // ?????????????????
      // routeNavigator.back();
    }
  }

  const updateCacheLogAction = async () => {
    const cacheLog = {
      ...headStore.info.data,
      project_id: projectStore.info.data?.id,
      contractor_id: contractorStore.info.data?.id,
    }
    headStore.update = await updateTableApi(cacheLog);
    HeadStore.setStore({
      ...headStore,
    });

    const cacheLogItems = tableStore.list?.data?.map((item) => {
      return {
        id: item.id || 0,
        ...item,
        cache_log_id: Number(props.cacheLog?.id),
      }
    });

    if(cacheLogItems?.length) {
      tableStore.update = await upsertManyTableApi(
        cacheLogItems
      );
    }

    // routeNavigator.back();

    if (headStore.update.error) {
      // routeNavigator.back();
    }
  }

  const onSubmit = async() => {
    await delay();
    if (props.isUpdate) {
      updateCacheLogAction();
    } else {
      addHeadAction();
    }
  }
  return (
    <FormLayoutGroup>
      <FormItem top="Название">
        <input id='id' key={headStore.info.data?.id} defaultValue={headStore.info.data?.id} hidden />
        <Input
          id="caption"
          key={headStore.info.data?.caption}
          defaultValue={headStore.info.data?.caption}
          onChange={(event) => updateDataAction('caption', event.target.value)}
        />
      </FormItem>
      <FormItem top="Описание">
        <Textarea
          placeholder="Описание проекта..."
          key={headStore.info.data?.description}
          defaultValue={ headStore.info.data?.description }
          onChange={(event) => updateDataAction('description', event.target.value)}
        />
      </FormItem>
      {props.contractorForm && props.contractorForm}
      <TableForm />
      <FormItem>
        <Button onClick={() => onSubmit()}>Сохранить</Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
