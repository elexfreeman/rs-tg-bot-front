import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { CacheLogI, infoCacheLogApi } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';
import CacheLogStore from 'src/store/cacheLog.store';
import { delay } from 'src/utils';

export const CacheLogUpdate = (props: {
  projectId: number;
  cacheLogId: number;
  contractorForm?: React.ReactNode;
}) => {
  const cacheLogStore = CacheLogStore.useStore();

  const infoCacheLogAction = async(cacheLogId: number, projectId: number) => {
    cacheLogStore.info = { data: {} };
    CacheLogStore.setStore({ ...cacheLogStore });
    await delay();
    cacheLogStore.info = await infoCacheLogApi(
      cacheLogId,
      projectId
    );
    CacheLogStore.setStore(cacheLogStore);
  }

  useEffect(() => {
    infoCacheLogAction(props.cacheLogId, props.projectId);
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
      <div className='space-div'></div>
    </Group>
  );
};

CacheLogUpdate.displayName = 'CacheLogUpdate';
