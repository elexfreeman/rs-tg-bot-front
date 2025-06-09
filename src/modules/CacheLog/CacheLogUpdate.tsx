import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { CacheLogI as HeadI, infoCacheLogApi as infoHeadApi } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm as HeadAddEditForm } from './CacheLogAddEditForm';
import HeadStore from 'src/store/cacheLog.store';
import TableItemStore from 'src/store/cacheLogItem.store';
import { delay } from 'src/utils';
import { getCacheLogItemListApi } from 'src/api/cacheLogItem_api';

export const CacheLogUpdate = (props: {
  projectId: number;
  cacheLogId: number;
  contractorForm?: React.ReactNode;
}) => {
  const headStore = HeadStore.useStore();
  const tableItemStore = TableItemStore.useStore();

  // получение информации об шапке и таблице
  const infoCacheLogAction = async(cacheLogId: number, projectId: number) => {
    // очищаем данные в сторе
    headStore.info = { data: {} };
    tableItemStore.list = { data: [] };
    HeadStore.setStore({ ...headStore });
    TableItemStore.setStore({...tableItemStore});
    await delay();
    // заполняем head
    headStore.info = await infoHeadApi(
      cacheLogId,
      projectId
    );
    HeadStore.setStore(headStore);
    // заполняем table
    if(headStore.info) {
      tableItemStore.list = await getCacheLogItemListApi(cacheLogId);
      TableItemStore.setStore({...tableItemStore});
    }
  }

  useEffect(() => {
    infoCacheLogAction(props.cacheLogId, props.projectId);
  }, []);

  const cacheLogData: Partial<HeadI> = {
    ...headStore.info.data,
  };

  return (
    <Group description="">
      <HeadAddEditForm
        cacheLog={cacheLogData}
        isUpdate
        contractorForm={props.contractorForm}
      />
      <div className='space-div'></div>
    </Group>
  );
};

CacheLogUpdate.displayName = 'CacheLogUpdate';
