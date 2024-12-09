import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { getCacheLogItemDefault, CacheLogItemI } from 'src/api/cacheLogItem_api';
import { CacheLogItemAddEditForm } from 'src/modules/CacheLogItem/CacheLogItemAddEditForm';
import {
  useCacheLogItemStore,
  setCacheLogItemStore,
} from 'src/store/cacheLogItem.store';

export const CacheLogItemAdd = (props: {
  projectId: number;
  contractorForm?: React.ReactNode;
}) => {
  const cacheLogItemStore = useCacheLogItemStore();

  useEffect(() => {
    cacheLogItemStore.info.data = getCacheLogItemDefault();
    setCacheLogItemStore({ ...cacheLogItemStore });
  }, []);

  const cacheLogItemData: Partial<CacheLogItemI> = {
    ...cacheLogItemStore.info.data,
  };
  return (
    <Group description="">
      <CacheLogItemAddEditForm
        cacheLogItem={cacheLogItemData}
        contractorForm={props.contractorForm}
      />
    </Group>
  );
};

CacheLogItemAdd.displayName = 'CacheLogItemAdd';
