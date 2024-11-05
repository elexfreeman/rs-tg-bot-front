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

import { Dashboard } from './pages/Dashboard/Dashboard';
import { ProjectAdd } from './pages/Project/ProjectAdd';
import { ProjectUpdate } from './pages/Project/ProjectUpdate';

import { ProjectCtrl } from './pages/Project/project_ctrl';
// import { DashboardCtrl } from './pages/Dashboard/dashboard_ctrl';
import { useProjectStore, setProjectStore } from './store/project.store';
import { DashboardCtrl } from './pages/Dashboard/dashboard_ctrl';

export const App: FC = () => {
  const routerPopout = usePopout();
  const projectStore = useProjectStore();
  /** Возвращает объект с помощью которого можно совершать переходы в навигации */
  const routeNavigator = useRouteNavigator();

  DashboardCtrl.init(routeNavigator, projectStore, setProjectStore);
  ProjectCtrl.init(routeNavigator, projectStore, setProjectStore);

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
            <Dashboard nav={AppRoutes.Dashboard} />
            <ProjectAdd nav={AppRoutes.ProjectAdd} />
            <ProjectUpdate nav={AppRoutes.ProjectUpdate} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
