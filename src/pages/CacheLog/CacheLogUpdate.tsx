import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderBack,
} from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';
import { useCacheLogStore } from 'src/store/cacheLog.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const CacheLogUpdate: FC<NavIdProps> = memo((props: NavIdProps) => {
  const cacheLogStore = useCacheLogStore();
  const cacheLogCtrl = CacheLogCtrl.getInstance();
    const params = useParams<'cacheLog_id'>();

  useEffect(() => {
    cacheLogCtrl.infoCacheLog(Number(params?.cacheLog_id));
  }, []);

  const newCacheLog: Partial<CacheLogI> = {
    ...cacheLogStore.info.data,
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
        <CacheLogAddEditForm cacheLog={newCacheLog} isUpdate />
      </Group>
    </Panel>
  );
});

CacheLogUpdate.displayName = 'CacheLogUpdate';
