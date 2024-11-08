import { FC, memo } from 'react';
import {NavIdProps, Panel, PanelHeader, Group, PanelHeaderBack } from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { CacheLogAddEditForm } from './CacheLogAddEditForm';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const CacheLogAdd: FC<NavIdProps> = memo(
  (props: NavIdProps) => {
    const params = useParams<'project_id'>();
    const newCacheLog: CacheLogI = {
      id: 0,
      caption: '',
      description: '',
      project_id: Number(params?.project_id),
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
