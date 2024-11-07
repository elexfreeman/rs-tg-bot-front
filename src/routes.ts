import {
  RoutesConfig,
  //  createHashRouter,
  createBrowserRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router';

const SHOP_ROOT = 'shop';
export const INITIAL_URL = '/';

export enum ShopView {
  Main = 'main',
}

export enum AppRoutes {
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
  Store = 'store',
  Dashboard = '/',
  ProjectAdd = 'ProjectAdd',
  ProjectUpdate = 'ProjectUpdate',
  ProjectInfo = 'ProjectInfo',
  ContractorList = 'ContractorList',
  ContractorAdd = 'ContractorAdd',
  ContractorUpdate = 'ContractorUpdate',
  ContractorInfo = 'ContractorInfo',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(SHOP_ROOT, [
    createView(ShopView.Main, [
      createPanel(AppRoutes.Dashboard, '/', []),
      createPanel(AppRoutes.ProjectAdd, `/${AppRoutes.ProjectAdd}`, []),
      createPanel(AppRoutes.ProjectUpdate, `/${AppRoutes.ProjectUpdate}/:project_id`, []),
      createPanel(AppRoutes.ProjectInfo, `/${AppRoutes.ProjectInfo}/:project_id`, []),
      createPanel(AppRoutes.ContractorList, `/${AppRoutes.ContractorList}`, []),
      createPanel(AppRoutes.ContractorAdd, `/${AppRoutes.ContractorAdd}`, []),
      createPanel(AppRoutes.ContractorUpdate, `/${AppRoutes.ContractorUpdate}/:contractor_id`, []),
      //      createPanel(ShopPanel.ProductInfo, `/${ShopPanel.ProductInfo}`, []),
      //      createPanel(ShopPanel.ShoppingCart, `/${ShopPanel.ShoppingCart}`, []),
    ]),
  ]),
]);

/** Передача массива маршрутов для создания роутера */
export const router = createBrowserRouter(routes.getRoutes());
