import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Store } from 'src/store/store';
import {
  getCacheLogList,
  addCacheLog,
  updateCacheLog,
  infoCacheLog,
} from 'src/api/cacheLog_api';
import { delay } from 'src/utils';
import { getLang } from 'src/lang/lang';
import { SelectFieldI } from 'src/types';
import { CacheLogI } from 'src/Entity/CacheLogE';

export type TSelectContractor = (contractor: SelectFieldI) => void;

export class CacheLogCtrl {
  private isInit = false;

  routeNavigator: RouteNavigator;

  private constructor() {
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: CacheLogCtrl;

  public static init(routeNavigator: RouteNavigator) {
    const ctrl = CacheLogCtrl.getInstance();
    ctrl.routeNavigator = routeNavigator;
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
    Store.getInstance().cacheLogStore.add = await addCacheLog(cacheLog);
    Store.getInstance().setCacheLogStore({
      ...Store.getInstance().cacheLogStore,
    });
    if (!Store.getInstance().cacheLogStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateCacheLog(cacheLog: Partial<CacheLogI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().cacheLogStore.update = await updateCacheLog(cacheLog);
    Store.getInstance().setCacheLogStore({
      ...Store.getInstance().cacheLogStore,
    });
    if (!Store.getInstance().cacheLogStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoCacheLog(cacheLogId: number, projectId: number) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().cacheLogStore.info = { data: {} };
    Store.getInstance().setCacheLogStore({
      ...Store.getInstance().cacheLogStore,
    });
    await delay();
    Store.getInstance().cacheLogStore.info = await infoCacheLog(
      cacheLogId,
      projectId
    );
    Store.getInstance().setCacheLogStore({
      ...Store.getInstance().cacheLogStore,
    });
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
    Store.getInstance().cacheLogStore.list = await getCacheLogList(projectId);
    Store.getInstance().setCacheLogStore({
      ...Store.getInstance().cacheLogStore,
    });
    return Store.getInstance().cacheLogStore;
  }

  goToAddCacheLog(projectId: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ProjectInfo/${projectId}/CacheLogAdd`);
  }

  goToUpdateCacheLog(projectId?: number, cacheLogId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(
      `/ProjectInfo/${projectId}/CacheLogUpdate/${cacheLogId}`
    );
  }

  async onSubmit(isUpdate?: boolean) {
    await delay();
    if (isUpdate) {
      this.updateCacheLog({
        ...Store.getInstance().cacheLogStore.info.data,
    //    project_id: Store.getInstance().projectStore.info.data?.id,
        contractor_id: Store.getInstance().contractorStore.info.data?.id,
      });
    } else {
      this.addCacheLog({
        ...Store.getInstance().cacheLogStore.info.data,
     //   project_id: Store.getInstance().projectStore.info.data?.id,
        contractor_id: Store.getInstance().contractorStore.info.data?.id,
      });
    }
  }
}
