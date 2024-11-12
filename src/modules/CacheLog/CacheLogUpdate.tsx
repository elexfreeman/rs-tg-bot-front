import { useEffect } from 'react';
import { Panel, PanelHeader, Group, PanelHeaderBack } from '@vkontakte/vkui';
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';
import {
  useCacheLogStore,
  setCacheLogStore,
} from 'src/store/cacheLog.store';

export const CacheLogUpdate = (props: {
  projectId: number;
  cacheLogId: number;
  contractorForm?: (props: {
    onSelectContractor?: (contractorId: number) => void;
  }) => React.ReactNode;
}) => {
  const cacheLogStore = useCacheLogStore();
  const cacheLogCtrl = CacheLogCtrl.getInstance();

  useEffect(() => {
    cacheLogCtrl.infoCacheLog(props.cacheLogId);
  }, []);

  const cacheLogData: Partial<CacheLogI> = {
    ...cacheLogStore.info.data,
  };

  const getContractorForm = () => {
    const onSelectContractor = (contractorId: number) => {
      if (cacheLogStore.info.data) {
        cacheLogStore.info.data.contractor_id = contractorId;
        setCacheLogStore({ ...cacheLogStore });
      }
    };
    if (props.contractorForm) {
      return <>props.contractorForm({onSelectContractor})</>;
    }
    return <></>;
  };

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => cacheLogCtrl.goBack()} />}
      >
        Редактировать платеж
      </PanelHeader>
      <Group description="">
        <CacheLogAddEditForm
          cacheLog={cacheLogData}
          isUpdate
          contractorForm={getContractorForm()}
        />
      </Group>
    </Panel>
  );
};

CacheLogUpdate.displayName = 'CacheLogUpdate';
