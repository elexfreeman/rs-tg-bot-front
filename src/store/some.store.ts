import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

export interface NavStoreI  {
    path?: string,
    title: string
}

export const mainPageNav = {
    path: '/',
    title: 'Главная'
}

export const defaultState = [mainPageNav];

const [navChange, setNavStore] = createSignal<NavStoreI[]>();
const [useNavStore] = bind(navChange, defaultState)

export {
    setNavStore,
    useNavStore,
}

