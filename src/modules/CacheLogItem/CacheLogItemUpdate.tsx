import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm } from './CacheLogItemAddEditForm';
import { useCacheLogItemStore } from 'src/store/cacheLogItem.store';
// import { CacheLogItemCtrl } from './cacheLogItem_ctrl';

export const CacheLogItemUpdate = (props: {
  projectId: number;
  cacheLogItemId: number;
}) => {
  const cacheLogItemStore = useCacheLogItemStore();
  //  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();

  useEffect(() => {
    //    cacheLogItemCtrl.infoCacheLogItem(props.cacheLogItemId, props.projectId);
    console.log(props);
  }, []);

  const cacheLogItemData: Partial<CacheLogItemI> = {
    ...cacheLogItemStore.info.data,
  };

  return (
    <Group description="">
      <CacheLogItemAddEditForm cacheLogItem={cacheLogItemData} isUpdate />
    </Group>
  );
};

CacheLogItemUpdate.displayName = 'CacheLogItemUpdate';
