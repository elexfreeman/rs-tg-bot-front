import { FC, memo } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { TabbarItem, Tabbar } from '@vkontakte/vkui'
import { Icon28Users3Outline, Icon28HomeOutline } from '@vkontakte/icons'
import { AppRoutes } from 'src/routes'

export type CustomTabbarProps = {
  activePanel: string
}

export const CustomTabbar: FC<CustomTabbarProps> = memo(
  ({ activePanel }: CustomTabbarProps) => {
    const routeNavigator = useRouteNavigator()

    const onContractorTabbarItemClick = () => {
      if (activePanel === AppRoutes.ContractorList) return
      routeNavigator.push(`/${AppRoutes.ContractorList}`);
    }

    const onDashboardTabbarItemClick = () => {
      if (activePanel === AppRoutes.Dashboard) return
      routeNavigator.push('/');
    }

    return (
      <Tabbar>
        <TabbarItem
          onClick={onDashboardTabbarItemClick}
          selected={activePanel === AppRoutes.Dashboard}
          data-story="dashboard"
          aria-label='home'
        >
          <Icon28HomeOutline />
        </TabbarItem>
        <TabbarItem
          onClick={onContractorTabbarItemClick}
          selected={activePanel === AppRoutes.ShoppingCart}
          data-story="contractor"
          aria-label='contractor'
        >
          <Icon28Users3Outline />
        </TabbarItem>
      </Tabbar>
    )
  }
)

CustomTabbar.displayName = 'CustomTabbar'
