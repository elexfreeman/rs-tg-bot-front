import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  ContractorStoreI,
  setContractorStore,
  defaultState as contractorStoreDefaultState,
} from './contractor.store';
import {
  addContractor,
  updateContractor,
  infoContractor,
  ContractorI,
  getContractorList
} from 'src/api/contractor_api';
import { delay } from 'src/utils';

export class ContractorCtrl {
  private isInit = false;
  contractorStore: ContractorStoreI;
  setContractorStore: (payload: ContractorStoreI) => void;
  routeNavigator: RouteNavigator;

  private constructor() {
    this.contractorStore = { ...contractorStoreDefaultState };
    // eslint-disable-next-line
    this.setContractorStore = (payload: ContractorStoreI) => {};
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: ContractorCtrl;

  public static init(
    routeNavigator: RouteNavigator,
    store: ContractorStoreI,
    setContractorStore: (payload: ContractorStoreI) => void
  ) {
    const ctrl = ContractorCtrl.getInstance();
    ctrl.contractorStore = store;
    ctrl.routeNavigator = routeNavigator;
    ctrl.setContractorStore = setContractorStore;
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
    this.contractorStore.add = await addContractor(contractor);
    setContractorStore({ ...this.contractorStore });
    if (!this.contractorStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateContractor(contractor: Partial<ContractorI>) {
    if (!this.isInit) {
      return;
    }
    this.contractorStore.update = await updateContractor(contractor);
    setContractorStore({ ...this.contractorStore });
    if (!this.contractorStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoContractor(contractorId: number) {
    if (!this.isInit) {
      return;
    }
    this.contractorStore.info = { data: {} };
    setContractorStore({ ...this.contractorStore });
    await delay();
    this.contractorStore.info = await infoContractor(contractorId);
    setContractorStore({ ...this.contractorStore });
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
      this.contractorStore.list = await getContractorList();
      this.setContractorStore({ ...this.contractorStore });
      return this.contractorStore;
  }
}
