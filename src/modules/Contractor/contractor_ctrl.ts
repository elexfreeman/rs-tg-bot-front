import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Result } from 'src/system/error_sys';
import { Store } from 'src/store/store';
import {
  addContractor,
  updateContractor,
  infoContractor,
  getContractorList,
} from 'src/api/contractor_api';
import { ContractorI } from 'src/Entity/ContractorE';
import { delay } from 'src/utils';

export class ContractorCtrl {
  private isInit = false;
  routeNavigator: RouteNavigator;

  private constructor() {
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: ContractorCtrl;

  public static init(
    routeNavigator: RouteNavigator,
  ) {
    const ctrl = ContractorCtrl.getInstance();
    ctrl.routeNavigator = routeNavigator;
    ctrl.isInit = true;
  }

  public static getInstance(): ContractorCtrl {
    if (!ContractorCtrl.instance) {
      ContractorCtrl.instance = new ContractorCtrl();
    }
    return ContractorCtrl.instance;
  }

  async addContractor(contractor: Partial<ContractorI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().contractorStore.add = await addContractor(contractor);
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
    if (!Store.getInstance().contractorStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateContractor(contractor: Partial<ContractorI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().contractorStore.update = await updateContractor(contractor);
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
    if (!Store.getInstance().contractorStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoContractor(contractorId: number) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().contractorStore.info = { data: {} };
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
    await delay();
    Store.getInstance().contractorStore.info = await infoContractor(contractorId);
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }

  goToUpdateContractor(contractorId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ContractorUpdate/${contractorId}`);
  }

  goToAddCache() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/`);
  }

  goToAddContractor() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ContractorAdd`);
  }

  goToInfoContractor(contractorId?: number) {
    if (!this.isInit) {
      return;
    }
    // this.routeNavigator.push(`/ContractorInfo/${contractorId}`);
    this.routeNavigator.push(`/ContractorUpdate/${contractorId}`);
  }

  async contractorList() {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().contractorStore.list = await getContractorList();
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
    return Store.getInstance().contractorStore;
  }

  onSubmit(e: React.SyntheticEvent, isUpdate?: boolean) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      itemId: { value: number };
      caption: { value: string };
      description: { value: string };
    };
    if (isUpdate) {
      this.updateContractor({
        caption: target.caption.value,
        description: target.description.value,
        id: Number(target.itemId.value),
      });
    } else {
      this.addContractor({
        caption: target.caption.value,
        description: target.description.value,
        id: Store.getInstance().contractorStore.info.data?.id,
      });
    }
  }

  setInfo(item: Partial<ContractorI>) {
    const info = Result.setData(item);
    Store.getInstance().contractorStore.info = info;
    Store.getInstance().setContractorStore({ ...Store.getInstance().contractorStore });
  }

  isSelected(id: number) {
    return id === Store.getInstance().contractorStore.info.data?.id;
  };
}
