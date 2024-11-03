import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

export interface ProjectStoreI  {
  list?: any[];
}

export const state = {
  list: [],
}

export const defaultState = state;

const [change, setProjectStore] = createSignal<ProjectStoreI>();
const [useProjectStore] = bind(change, defaultState)

export {
    setProjectStore,
    useProjectStore,
}

