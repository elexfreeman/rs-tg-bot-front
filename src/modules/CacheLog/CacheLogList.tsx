import { useEffect } from 'react';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { CacheLogCtrl } from './cacheLogItem_ctrl';
import { useCacheLogStore } from 'src/store/cacheLog.store';

export const CacheLogList = (props: { projectId: number }) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();
  const cacheLogStore = useCacheLogStore();

  useEffect(() => {
    cacheLogCtrl.cacheLogList(props.projectId);
  }, []);

  return (
    <Group mode="plain" header={<Header mode="secondary">Платежи</Header>}>
      <CellButton
        onClick={() => cacheLogCtrl.goToAddCacheLog(props.projectId)}
        before={<Icon28AddOutline />}
      >
        Добавить платеж
      </CellButton>
      {cacheLogStore?.list?.data?.map((item) => (
        <>
          <div
            className="table-cache"
            onClick={() => cacheLogCtrl.goToUpdateCacheLog(props.projectId, item.id)}
          >
            <div className="table-cache-item">
              <div className="table-cache-item__date">
                <div className="table-cache-item__dot">
                  <div className="color-dot"></div>
                </div>
                <div>{item.created_at}</div>
              </div>
              <div className="table-cache-item__summa">240 000</div>
            </div>
            <div>{item.caption}</div>
          </div>

          <Separator />
        </>
      ))}
    </Group>
  );
};

CacheLogList.displayName = 'CacheLog';
