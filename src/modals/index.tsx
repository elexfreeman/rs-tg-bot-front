import { ModalRoot } from '@vkontakte/vkui'
import React from 'react'
import {
  useActiveVkuiLocation,
//  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router'

const Modals: React.FC = () => {
  const { modal } = useActiveVkuiLocation()
 // const routeNavigator = useRouteNavigator()
      // <FiltersModal onClose={() => routeNavigator.hideModal()} id="filter" />

  return (
    // ModalRoot - контейнер для модальных страниц и карточек
    // activeModal - текущая открытая модальная страница | undefind
    <ModalRoot activeModal={modal}><div>aa</div></ModalRoot>
  )
}

export { Modals }
