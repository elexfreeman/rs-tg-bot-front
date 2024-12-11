import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { getCacheLogItemDefault  } from 'src/api/cacheLogItem_api';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm } from 'src/modules/CacheLogItem/CacheLogItemAddEditForm';
import {
  useCacheLogItemStore,
  setCacheLogItemStore,
} from 'src/store/cacheLogItem.store';

export const CacheLogItemAdd = (props: { projectId: number; }) => {
  const cacheLogItemStore = useCacheLogItemStore();

  useEffect(() => {
    cacheLogItemStore.info.data = getCacheLogItemDefault();
    setCacheLogItemStore({ ...cacheLogItemStore });
    console.log(props)
  }, []);

  const cacheLogItemData: Partial<CacheLogItemI> = {
    ...cacheLogItemStore.info.data,
  };
  return (
    <Group description="">
      <CacheLogItemAddEditForm
        cacheLogItem={cacheLogItemData}
      />
    </Group>
  );
};

CacheLogItemAdd.displayName = 'CacheLogItemAdd';
