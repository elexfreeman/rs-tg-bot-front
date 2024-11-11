import { useEffect } from 'react';
import { Group } from '@vkontakte/vkui';
import { getCacheLogDefault, CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from 'src/modules/CacheLog/CacheLogAddEditForm';
import {
  useCacheLogStore,
  setCacheLogStore,
} from 'src/modules/CacheLog/cacheLog.store';
import { TSelectContractor } from './cacheLog_ctrl';
import {SelectFieldI} from 'src/types';

export const CacheLogAdd = (props: {
  projectId: number;
  contractorForm?: (props: {
    onSelectContractor?: TSelectContractor;
  }) => React.ReactNode;
}) => {
  const cacheLogStore = useCacheLogStore();

  useEffect(() => {
    cacheLogStore.info.data = getCacheLogDefault();
    setCacheLogStore({ ...cacheLogStore });
  }, []);

  const cacheLogData: Partial<CacheLogI> = {
    ...cacheLogStore.info.data,
  };
  const getContractorForm = () => {
    const onSelectContractor = (contractor: SelectFieldI) => {
      if (cacheLogStore.info.data) {
        cacheLogStore.info.data.contractor_id = contractor.id;
        setCacheLogStore({ ...cacheLogStore });
      }
    };
    if (props.contractorForm) {
      return <>{props.contractorForm({ onSelectContractor })}</>;
    }
    return <></>;
  };

  return (
    <Group description="">
      <CacheLogAddEditForm
        cacheLog={cacheLogData}
        contractorForm={getContractorForm()}
      />
    </Group>
  );
};

CacheLogAdd.displayName = 'CacheLogAdd';
