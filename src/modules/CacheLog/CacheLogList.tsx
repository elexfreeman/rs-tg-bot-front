import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import CacheLogStore from 'src/store/cacheLog.store';
import { getCacheLogListApi } from 'src/api/cacheLog_api';

export const CacheLogList = (props: { projectId: number }) => {
  const cacheLogStore = CacheLogStore.useStore();
  const routeNavigator = useRouteNavigator();

  const cacheLogList = async (projectId: number) => {
    cacheLogStore.list = await getCacheLogListApi(projectId);
    CacheLogStore.setStore({
      ...cacheLogStore,
    });
  }

  const goToAddCacheLog = (projectId: number) => {
    routeNavigator.push(`/ProjectInfo/${projectId}/CacheLogAdd`);
  }

  const goToUpdateCacheLog = (projectId?: number, cacheLogId?: number) => {
    routeNavigator.push(
      `/ProjectInfo/${projectId}/CacheLogUpdate/${cacheLogId}`
    );
  }

  useEffect(() => {
    cacheLogList(props.projectId);
  }, []);

  return (
    <Group mode="plain" header={<Header mode="secondary">Платежи</Header>}>
      <CellButton
        onClick={() => goToAddCacheLog(props.projectId)}
        before={<Icon28AddOutline />}
      >
        Добавить платеж
      </CellButton>
      {cacheLogStore?.list?.data?.map((item, idx) => (
        <div key={idx}>
          <div
            className="table-cache"
            onClick={() => goToUpdateCacheLog(props.projectId, item.id)}
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
        </div>
      ))}
    </Group>
  );
};

CacheLogList.displayName = 'CacheLog';
