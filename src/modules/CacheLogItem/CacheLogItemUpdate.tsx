import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm } from './CacheLogItemAddEditForm';
import { useCacheLogItemStore } from 'src/store/cacheLogItem.store';
// import { CacheLogItemCtrl } from './cacheLogItem_ctrl';

export const CacheLogItemUpdate = (props: {
  projectId: number;
  cacheLogItemId: number;
  contractorForm?: React.ReactNode;
}) => {
  const cacheLogItemStore = useCacheLogItemStore();
//  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();

  useEffect(() => {
//    cacheLogItemCtrl.infoCacheLogItem(props.cacheLogItemId, props.projectId);
  }, []);

  const cacheLogItemData: Partial<CacheLogItemI> = {
    ...cacheLogItemStore.info.data,
  };

  return (
    <Group description="">
      <CacheLogItemAddEditForm
        cacheLogItem={cacheLogItemData}
        isUpdate
        contractorForm={props.contractorForm}
      />
    </Group>
  );
};

CacheLogItemUpdate.displayName = 'CacheLogItemUpdate';
