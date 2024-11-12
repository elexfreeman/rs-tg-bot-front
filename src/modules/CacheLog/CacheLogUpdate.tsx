import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';
import { useCacheLogStore } from 'src/store/cacheLog.store';

export const CacheLogUpdate = (props: {
  projectId: number;
  cacheLogId: number;
  contractorForm?: React.ReactNode;
}) => {
  const cacheLogStore = useCacheLogStore();
  const cacheLogCtrl = CacheLogCtrl.getInstance();

  useEffect(() => {
    cacheLogCtrl.infoCacheLog(props.cacheLogId, props.projectId);
  }, []);

  const cacheLogData: Partial<CacheLogI> = {
    ...cacheLogStore.info.data,
  };

  return (
    <Group description="">
      <CacheLogAddEditForm
        cacheLog={cacheLogData}
        isUpdate
        contractorForm={props.contractorForm}
      />
    </Group>
  );
};

CacheLogUpdate.displayName = 'CacheLogUpdate';
