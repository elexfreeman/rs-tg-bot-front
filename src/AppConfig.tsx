import {
  ConfigProvider,
  AppRoot,
  Appearance,
} from '@vkontakte/vkui'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { router } from './routes'
import { App } from './App'

export const AppConfig = () => {

  return (
    <ConfigProvider
      appearance={Appearance.LIGHT}
      platform={undefined}
      isWebView={true}
      hasCustomPanelHeaderAfter={true}
    >
      <AppRoot mode="full">
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AppRoot>
    </ConfigProvider>
  )
}
