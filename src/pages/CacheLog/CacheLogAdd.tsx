import { FC, memo } from 'react';
import {NavIdProps, Panel, PanelHeader, Group, PanelHeaderBack } from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';

export const CacheLogAdd: FC<NavIdProps> = memo(
  (props: NavIdProps) => {
    const newCacheLog: CacheLogI = {
      id: 0,
      caption: '',
      description: '',
    };

  const cacheLogCtrl = CacheLogCtrl.getInstance();
    return (
      <Panel className="Panel__fullScreen" {...props}>
        <PanelHeader
          delimiter="none"
          before={<PanelHeaderBack onClick={() => cacheLogCtrl.goBack()} />}
        >
          Новый платеж
        </PanelHeader>
        <Group description="">
          <CacheLogAddEditForm cacheLog={newCacheLog} />
        </Group>
      </Panel>
    );
  }
);

CacheLogAdd.displayName = 'CacheLogAdd';
