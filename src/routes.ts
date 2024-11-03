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

export enum ShopPanel {
  ProductInfo = 'productInfo',
  ShoppingCart = 'shoppingCart',
  Store = 'store',
  Dashboard = '/',
}

/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(SHOP_ROOT, [
    createView(ShopView.Main, [
      createPanel(ShopPanel.Dashboard, '/', []),
//      createPanel(ShopPanel.Store, `/${ShopPanel.Store}`, []),
//      createPanel(ShopPanel.ProductInfo, `/${ShopPanel.ProductInfo}`, []),
//      createPanel(ShopPanel.ShoppingCart, `/${ShopPanel.ShoppingCart}`, []),
    ]),
  ]),
])

/** Передача массива маршрутов для создания роутера */
export const router = createBrowserRouter(routes.getRoutes())
