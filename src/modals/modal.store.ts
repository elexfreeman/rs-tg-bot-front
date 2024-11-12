import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';

export interface ModalStoreI {
  content?: () => React.ReactNode;
}

export const state: ModalStoreI = {
};

export const defaultState = {...state};

const [change, setModalStore] = createSignal<ModalStoreI>();
const [useModalStore] = bind(change, defaultState);

export { setModalStore, useModalStore };

