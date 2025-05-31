import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { addContractorApi, ContractorI, updateContractorApi } from 'src/api/contractor_api';
import ContractorStore from 'src/store/contractor.store';

interface ContractorAddEditFormPops {
  contractor?: Partial<ContractorI>;
  isUpdate?: boolean;
}

export const ContractorAddEditForm = (props: ContractorAddEditFormPops) => {
  const contractorStore = ContractorStore.useStore();
  const routeNavigator = useRouteNavigator();

  const updateContractor = async (contractor: Partial<ContractorI>) => {
    contractorStore.update = await updateContractorApi(contractor);
    ContractorStore.setStore({ ...contractorStore });
    if (!contractorStore.update.error) {
      routeNavigator.back();
    }
  }

  const addContractor = async (contractor: Partial<ContractorI>) => {
    contractorStore.add = await addContractorApi(contractor);
    ContractorStore.setStore({ ...contractorStore });
    if (!contractorStore.add.error) {
      routeNavigator.back();
    }
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      itemId: { value: number };
      caption: { value: string };
      description: { value: string };
    };
    if (props.isUpdate) {
      updateContractor({
        caption: target.caption.value,
        description: target.description.value,
        id: Number(target.itemId.value),
      });
    } else {
      addContractor({
        caption: target.caption.value,
        description: target.description.value,
        id: contractorStore.info.data?.id,
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
    >
      <input
        type="hidden"
        name="itemId"
        key={props.contractor?.id}
        defaultValue={props.contractor?.id}
      />
      <FormLayoutGroup>
        <FormItem
          htmlFor="caption"
          top="Название"
          value={props.contractor?.caption}
        >
          <Input
            name="caption"
            key={props.contractor?.caption}
            defaultValue={props.contractor?.caption}
          />
        </FormItem>
        <FormItem top="Описание">
          <Textarea
            name="description"
            placeholder="Описание проекта..."
            key={props.contractor?.description}
            defaultValue={props.contractor?.description}
          />
        </FormItem>
        <FormItem>
          <Button type="submit">Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
