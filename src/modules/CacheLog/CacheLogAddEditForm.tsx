import { useState, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { Store } from 'src/store/store';
import { setCacheLogStore, useCacheLogStore } from 'src/store/cacheLog.store';
import { Result } from 'src/system/error_sys';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();
  const cacheLogStore = useCacheLogStore();

  const [updateData, setUpdateData] = useState<Partial<CacheLogI>>({});

  useEffect(() => {
    setUpdateData(cacheLogStore.info?.data || {});
  }, [cacheLogStore.info?.data]);

  const onUpdateData = (field: keyof CacheLogI, data: any) => {
    updateData[field] = data;
    setUpdateData({ ...updateData });
  };

  const onSave = () => {
    const info = Result.setData({...updateData});
    setCacheLogStore({ ...cacheLogStore, info });
    cacheLogCtrl.onSubmit(props.isUpdate);
  };

  return (
    <FormLayoutGroup>
      <FormItem htmlFor="caption" top="Название">
        <Input
          id="caption"
          key={Store.getInstance().cacheLogStore.info.data?.caption}
          defaultValue={Store.getInstance().cacheLogStore.info.data?.caption}
          onChange={(event) => onUpdateData('caption', event.target.value)}
        />
      </FormItem>
      <FormItem top="Описание">
        <Textarea
          placeholder="Описание проекта..."
          key={Store.getInstance().cacheLogStore.info.data?.description}
          defaultValue={
            Store.getInstance().cacheLogStore.info.data?.description
          }
          onChange={(event) => onUpdateData('description', event.target.value)}
        />
      </FormItem>
      {props.contractorForm && props.contractorForm}
      <FormItem>
        <Button onClick={() => onSave()}>Сохранить</Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
