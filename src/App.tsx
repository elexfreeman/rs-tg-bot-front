import { FC, useCallback } from 'react';
import {
  SplitLayout,
  SplitCol,
  View,
  Epic,
  useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  usePopout,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { Modals } from './modals';
import { AppRoutes, ShopView } from './routes';
import { CustomTabbar } from './components';

import { DashboardPage } from 'src/pages/Dashboard/DashboardPage';

import { ProjectAddPage } from 'src/pages/Project/ProjectAddPage';
import { ProjectUpdatePage } from 'src/pages/Project/ProjectUpdatePage';
import { ProjectInfoPage } from 'src/pages/Project/ProjectInfoPage';

import { ContractorAddPage } from './pages/Contractor/ContractorAddPage';
import { ContractorUpdatePage } from './pages/Contractor/ContractorUpdatePage';
import { ContractorListPage } from './pages/Contractor/ContractorListPage';

import { CacheLogAddPage } from './pages/CacheLog/CacheLogAddPage';
import { CacheLogUpdatePage } from './pages/CacheLog/CacheLogUpdatePage';

import {
  useContractorStore,
  setContractorStore,
} from 'src/store/contractor.store';
import {
  useCacheLogItemStore,
  setCacheLogItemStore,
} from 'src/store/cacheLogItem.store';

import { Store } from './store/store';

import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import { CacheLogCtrl } from 'src/modules/CacheLog/cacheLog_ctrl';
import { CacheLogItemCtrl } from 'src/modules/CacheLogItem/cacheLogItem_ctrl';

export const App: FC = () => {
  const routerPopout = usePopout();

  /** Возвращает объект с помощью которого можно совершать переходы в навигации */
  const routeNavigator = useRouteNavigator();

  const store = Store.getInstance();
  const contractorStore = useContractorStore();
  const cacheLogItemStore = useCacheLogItemStore();

  store.initContractorStore(contractorStore, setContractorStore);
  store.initCacheLogItemStore(cacheLogItemStore, setCacheLogItemStore);

  ProjectCtrl.init(routeNavigator);
  ContractorCtrl.init(routeNavigator);
  CacheLogCtrl.init(routeNavigator);
  CacheLogItemCtrl.init(routeNavigator);

  /** Получаем текущую позицию */
  const {
    panelsHistory,
    view: activeView = AppRoutes.Store,
    panel: activePanel = ShopView.Main,
  } = useActiveVkuiLocation();

  /** Получаем тип устройства */
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const onSwipeBack = useCallback(
    () => routeNavigator.back(),
    [routeNavigator]
  );

  return (
    <SplitLayout popout={routerPopout} modal={<Modals />}>
      <title>{process.env.REACT_APP_WEBSITE_NAME}</title>
      <SplitCol>
        <Epic
          activeStory={activeView}
          tabbar={!isDesktop && <CustomTabbar activePanel={activePanel} />}
        >
          <View
            onSwipeBack={onSwipeBack}
            history={panelsHistory}
            nav={ShopView.Main}
            activePanel={activePanel}
          >
            <DashboardPage nav={AppRoutes.Dashboard} />
            <ProjectAddPage nav={AppRoutes.ProjectAdd} />
            <ProjectUpdatePage nav={AppRoutes.ProjectUpdate} />
            <ProjectInfoPage nav={AppRoutes.ProjectInfo} />
            <ContractorAddPage nav={AppRoutes.ContractorAdd} />
            <ContractorUpdatePage nav={AppRoutes.ContractorUpdate} />
            <ContractorListPage nav={AppRoutes.ContractorList} />
            <CacheLogAddPage nav={AppRoutes.CacheLogAdd} />
            <CacheLogUpdatePage nav={AppRoutes.CacheLogUpdate} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
