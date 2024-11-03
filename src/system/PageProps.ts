import {
  NavIdProps,
} from '@vkontakte/vkui';

export interface PageProps<T> extends NavIdProps {
  ctrl: T;
}

