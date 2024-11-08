import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  CacheLogStoreI,
  setCacheLogStore,
  defaultState as cacheLogStoreDefaultState,
} from '../../store/cacheLog.store';
import {
  getCacheLogList,
  addCacheLog,
  updateCacheLog,
  infoCacheLog,
  CacheLogI,
} from 'src/api/cacheLog_api';
import { delay } from 'src/utils';
import { getLang } from 'src/lang/lang';

export class CacheLogCtrl {
  private isInit = false;
  cacheLogStore: CacheLogStoreI;
  setCacheLogStore: (payload: CacheLogStoreI) => void;
  routeNavigator: RouteNavigator;

  private constructor() {
    this.cacheLogStore = { ...cacheLogStoreDefaultState };
    // eslint-disable-next-line
    this.setCacheLogStore = (payload: CacheLogStoreI) => {};
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: CacheLogCtrl;

  public static init(
    routeNavigator: RouteNavigator,
    store: CacheLogStoreI,
    setCacheLogStore: (payload: CacheLogStoreI) => void
  ) {
    const ctrl = CacheLogCtrl.getInstance();
    ctrl.cacheLogStore = store;
    ctrl.routeNavigator = routeNavigator;
    ctrl.setCacheLogStore = setCacheLogStore;
    ctrl.isInit = true;
  }

  public static getInstance(): CacheLogCtrl {
    if (!CacheLogCtrl.instance) {
      CacheLogCtrl.instance = new CacheLogCtrl();
    }
    return CacheLogCtrl.instance;
  }

  async getLang() {
    return getLang();
  }

  async addCacheLog(cacheLog: Partial<CacheLogI>) {
    if (!this.isInit) {
      return;
    }
    this.cacheLogStore.add = await addCacheLog(cacheLog);
    setCacheLogStore({ ...this.cacheLogStore });
    if (!this.cacheLogStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateCacheLog(cacheLog: Partial<CacheLogI>) {
    if (!this.isInit) {
      return;
    }
    this.cacheLogStore.update = await updateCacheLog(cacheLog);
    setCacheLogStore({ ...this.cacheLogStore });
    if (!this.cacheLogStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoCacheLog(cacheLogId: number) {
    if (!this.isInit) {
      return;
    }
    this.cacheLogStore.info = { data: {} };
    setCacheLogStore({ ...this.cacheLogStore });
    await delay();
    this.cacheLogStore.info = await infoCacheLog(cacheLogId);
    setCacheLogStore({ ...this.cacheLogStore });
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }

  async cacheLogList(projectId: number) {
    if (!this.isInit) {
      return;
    }
      this.cacheLogStore.list = await getCacheLogList(projectId);
      this.setCacheLogStore({ ...this.cacheLogStore });
      return this.cacheLogStore;
  }

  goToAddCacheLog(projectId: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ProjectInfo/${projectId}/CacheLogAdd`);
  }

  goToUpdateCacheLog(cacheLogId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/CacheLogUpdate/${cacheLogId}`);
  }
}
