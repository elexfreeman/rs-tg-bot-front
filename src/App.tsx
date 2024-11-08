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

import { ContractorAddPage } from './pages/Contractor/ContractorAddPage'; import { ContractorUpdatePage } from './pages/Contractor/ContractorUpdatePage';
import { ContractorListPage } from './pages/Contractor/ContractorListPage';

// import { CacheLogAdd } from './pages/Project/CacheLog/CacheLogAdd';

import {
  useProjectStore,
  setProjectStore,
} from './modules/Project/project.store';
import {
  useContractorStore,
  setContractorStore,
} from './modules/Contractor/contractor.store';
import {
  useCacheLogStore,
  setCacheLogStore,
} from './modules/CacheLog/cacheLog.store';

import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import { CacheLogCtrl } from 'src/modules/CacheLog/cacheLog_ctrl';

export const App: FC = () => {
  const routerPopout = usePopout();

  const projectStore = useProjectStore();
  const contractorStore = useContractorStore();
  const cacheLogStore = useCacheLogStore();

  /** Возвращает объект с помощью которого можно совершать переходы в навигации */
  const routeNavigator = useRouteNavigator();

  ProjectCtrl.init(routeNavigator, projectStore, setProjectStore);
  ContractorCtrl.init(routeNavigator, contractorStore, setContractorStore);
  CacheLogCtrl.init(routeNavigator, cacheLogStore, setCacheLogStore);

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

  /**
            <CacheLogAdd nav={AppRoutes.CacheLogAdd} />
   * SplitLayout - Компонент-контейнер для реализации интерфейса с многоколоночной структурой [https://vkcom.github.io/VKUI/#/SplitLayout]
   * SplitCol Компонент-обертка для отрисовки колонки в многоколоночном интерфейсе. [https://vkcom.github.io/VKUI/#/SplitCol]
   * View - хранилище Panel [https://vkcom.github.io/VKUI/#/View]
   * Panel - контент одной страницы [https://vkcom.github.io/VKUI/#/Panel]
   */
  return (
    /**
     * popout - свойство для отрисовки Alert ActionSheet ScreenSpinner
     * modal - свойство для отрисовки модальных страниц(ModalRoot)
     */
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
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
