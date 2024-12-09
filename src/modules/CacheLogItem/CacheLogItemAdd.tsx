import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { getCacheLogDefault, CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from 'src/modules/CacheLog/CacheLogAddEditForm';
import {
  useCacheLogStore,
  setCacheLogStore,
} from 'src/store/cacheLog.store';

export const CacheLogAdd = (props: {
  projectId: number;
  contractorForm?: React.ReactNode;
}) => {
  const cacheLogStore = useCacheLogStore();

  useEffect(() => {
    cacheLogStore.info.data = getCacheLogDefault();
    setCacheLogStore({ ...cacheLogStore });
  }, []);

  const cacheLogData: Partial<CacheLogI> = {
    ...cacheLogStore.info.data,
  };
  return (
    <Group description="">
      <CacheLogAddEditForm
        cacheLog={cacheLogData}
        contractorForm={props.contractorForm}
      />
    </Group>
  );
};

CacheLogAdd.displayName = 'CacheLogAdd';
