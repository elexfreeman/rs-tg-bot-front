import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Store } from 'src/store/store';
import {
  getCacheLogItemList,
  addCacheLogItem,
  updateCacheLogItem,
} from 'src/api/cacheLogItem_api';
import { getLang } from 'src/lang/lang';
import { SelectFieldI } from 'src/types';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';

export type TSelectContractor = (contractor: SelectFieldI) => void;

export class CacheLogItemCtrl {
  private isInit = false;

  routeNavigator: RouteNavigator;

  private constructor() {
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: CacheLogItemCtrl;

  public static init(routeNavigator: RouteNavigator) {
    const ctrl = CacheLogItemCtrl.getInstance();
    ctrl.routeNavigator = routeNavigator;
    ctrl.isInit = true;
  }

  public static getInstance(): CacheLogItemCtrl {
    if (!CacheLogItemCtrl.instance) {
      CacheLogItemCtrl.instance = new CacheLogItemCtrl();
    }
    return CacheLogItemCtrl.instance;
  }

  async getLang() {
    return getLang();
  }

  async addCacheLogItem(cacheLogItem: Partial<CacheLogItemI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().cacheLogItemStore.add = await addCacheLogItem(cacheLogItem);
    Store.getInstance().setCacheLogItemStore({
      ...Store.getInstance().cacheLogItemStore,
    });
    if (!Store.getInstance().cacheLogItemStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateCacheLogItem(cacheLogItem: Partial<CacheLogItemI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().cacheLogItemStore.update = await updateCacheLogItem(cacheLogItem);
    Store.getInstance().setCacheLogItemStore({
      ...Store.getInstance().cacheLogItemStore,
    });
    if (!Store.getInstance().cacheLogItemStore.update.error) {
      this.routeNavigator.back();
    }
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }

  async cacheLogItemList(projectId: number) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().cacheLogItemStore.list = await getCacheLogItemList(projectId);
    Store.getInstance().setCacheLogItemStore({
      ...Store.getInstance().cacheLogItemStore,
    });
    return Store.getInstance().cacheLogItemStore;
  }

  goToAddCacheLogItem(projectId: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ProjectInfo/${projectId}/CacheLogItemAdd`);
  }

  goToUpdateCacheLogItem(projectId?: number, cacheLogItemId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(
      `/ProjectInfo/${projectId}/CacheLogItemUpdate/${cacheLogItemId}`
    );
  }

  onSubmit(e: React.SyntheticEvent, isUpdate?: boolean) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      caption: { value: string };
      description: { value: string };
    };
    if (isUpdate) {
      this.updateCacheLogItem({
        caption: target.caption.value,
        description: target.caption.value,
        project_id: Store.getInstance().projectStore.info.data?.id,
        contractor_id: Store.getInstance().contractorStore.info.data?.id,
        id: Store.getInstance().contractorStore.info.data?.id,
      });
    } else {
      this.addCacheLogItem({
        caption: target.caption.value,
        description: target.caption.value,
        project_id: Store.getInstance().projectStore.info.data?.id,
        contractor_id: Store.getInstance().contractorStore.info.data?.id,
      });
    }
  }
}
