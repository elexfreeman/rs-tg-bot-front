import { useEffect } from 'react';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { CacheLogItemCtrl } from 'src/modules/CacheLogItem/cacheLogItem_ctrl';
import { useCacheLogItemStore } from 'src/store/cacheLogItem.store';

export const CacheLogItemList = (props: { projectId: number }) => {
  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();
  const cacheLogItemStore = useCacheLogItemStore();

  useEffect(() => {
    cacheLogItemCtrl.cacheLogItemList(props.projectId);
  }, []);

  return (
    <Group mode="plain" header={<Header mode="secondary">Платежи</Header>}>
      <CellButton
        onClick={() => cacheLogItemCtrl.goToAddCacheLogItem(props.projectId)}
        before={<Icon28AddOutline />}
      >
        Добавить платеж
      </CellButton>
      {cacheLogItemStore?.list?.data?.map((item) => (
        <>
          <div
            className="table-cache"
            onClick={() => cacheLogItemCtrl.goToUpdateCacheLogItem(props.projectId, item.id)}
          >
            <div className="table-cache-item">
              <div className="table-cache-item__date">
                <div className="table-cache-item__dot">
                  <div className="color-dot"></div>
                </div>
                <div>{item.caption}</div>
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

CacheLogItemList.displayName = 'CacheLogItem';
