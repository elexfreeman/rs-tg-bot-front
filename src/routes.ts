import {
  RoutesConfig,
//  createHashRouter,
  createBrowserRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router'

const SHOP_ROOT = 'shop'
export const INITIAL_URL = '/'

export enum ShopView {
  Main = 'main',
}

export enum AppRoutes {
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
  Store = 'store',
  Dashboard = '/',
  ProjectAdd = 'ProjectAdd',
  ProjectInfo = 'ProductInfo',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(SHOP_ROOT, [
    createView(ShopView.Main, [
      createPanel(AppRoutes.Dashboard, '/', []),
      createPanel(AppRoutes.ProjectAdd, `/${AppRoutes.ProjectAdd}`, []),
//      createPanel(ShopPanel.ProductInfo, `/${ShopPanel.ProductInfo}`, []),
//      createPanel(ShopPanel.ShoppingCart, `/${ShopPanel.ShoppingCart}`, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createBrowserRouter(routes.getRoutes())
