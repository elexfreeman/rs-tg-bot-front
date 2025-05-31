import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { CacheLogItemCtrl } from 'src/modules/CacheLogItem/cacheLogItem_ctrl';
import CacheLogItemStore from 'src/store/cacheLogItem.store';
import { getCacheLogItemListApi } from 'src/api/cacheLogItem_api';

export const CacheLogItemList = (props: { projectId: number }) => {
  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();
  const cacheLogItemStore = CacheLogItemStore.useStore();
  const routeNavigator = useRouteNavigator();

  const cacheLogItemList = async (cacheLogId: number) => {
    const out = await getCacheLogItemListApi(cacheLogId);
    cacheLogItemStore.list = out;
    CacheLogItemStore.setStore({
      ...cacheLogItemStore,
    });
    return out;
  }

  const goToAddCacheLogItem = (projectId: number) => {
    routeNavigator.push(`/ProjectInfo/${projectId}/CacheLogItemAdd`);
  }

  useEffect(() => {
    cacheLogItemList(props.projectId);
  }, []);

  return (
    <Group mode="plain" header={<Header mode="secondary">Платежи</Header>}>
      <CellButton
        onClick={() => goToAddCacheLogItem(props.projectId)}
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
