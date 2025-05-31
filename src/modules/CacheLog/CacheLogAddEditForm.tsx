import { useState, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { CacheLogI, updateCacheLogApi} from 'src/api/cacheLog_api';
import { Result } from 'src/system/error_sys';
import CacheLogStore from 'src/store/cacheLog.store';
import ContractorStore from 'src/store/contractor.store';
import ProjectLogStore from 'src/store/project.store';
import { delay } from 'src/utils';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
  cacheLogItemListForm: React.ReactNode;
}) => {
  const cacheLogStore = CacheLogStore.useStore();
  const projectStore = ProjectLogStore.useStore();
  const contractorStore = ContractorStore.useStore();

  const [updateData, setUpdateData] = useState<Partial<CacheLogI>>({});

  useEffect(() => {
    setUpdateData(cacheLogStore.info?.data || {});
  }, [cacheLogStore.info?.data]);

  const onUpdateData = (field: keyof CacheLogI, data: any) => {
    updateData[field] = data;
    setUpdateData({ ...updateData });
  };

  const onSave = async () => {
    const info = Result.setData({ ...updateData });
    CacheLogStore.setStore({ ...cacheLogStore, info });
    await delay();
    updateCacheLogApi({
      ...cacheLogStore.info.data,
      project_id: projectStore.info.data?.id,
      contractor_id: contractorStore.info.data?.id,
    });
  };

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
        <Button onClick={() => onSave()}>Сохранить</Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
