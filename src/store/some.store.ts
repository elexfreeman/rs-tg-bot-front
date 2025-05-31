import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

export interface NavStoreI  {
    path?: string,
    title: string
}

export default new class NavStore {
    setStore:  (payload: NavStoreI[]) => void;
    useStore: () => NavStoreI[];

    readonly defaultState = [{
        path: '/',
        title: 'Главная'
    }];

    constructor() {
    const [change, setNavStore] = createSignal<NavStoreI[]>();
    const [useNavStore] = bind(change, this.defaultState);

    this.setStore = setNavStore;
    this.useStore = useNavStore;

    this.setStore(this.defaultState);
    }

}
