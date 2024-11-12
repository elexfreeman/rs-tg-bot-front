import { ModalRoot, ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import React from 'react';
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { useModalStore } from './modal.store';
import { Icon24Dismiss } from '@vkontakte/icons';

const Modals: React.FC = () => {
  const { modal } = useActiveVkuiLocation();
  // routeNavigator.showModal('filter')
  const routeNavigator = useRouteNavigator();
  const modalStore = useModalStore();
  console.log(modalStore.content && modalStore.content())

  return (
    // ModalRoot - контейнер для модальных страниц и карточек
    // activeModal - текущая открытая модальная страница | undefind
    <ModalRoot activeModal={modal}>
      <ModalPage
        id="main_modal"
        dynamicContentHeight
        header={
          <ModalPageHeader
            after={
              <Icon24Dismiss
                fill="#818C99"
                onClick={() => routeNavigator.hideModal()}
              />
            }
          >
            Фильтр
          </ModalPageHeader>
        }
      >
        {modalStore.content && modalStore.content()}
      </ModalPage>
    </ModalRoot>
  );
};

export { Modals };
