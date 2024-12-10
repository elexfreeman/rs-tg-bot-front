import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { CacheLogItemCtrl } from './cacheLogItem_ctrl';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { Store } from 'src/store/store';

export const CacheLogItemAddEditForm = (props: {
  cacheLogItem?: Partial<CacheLogItemI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();

  return (
    <form onSubmit={(e) => cacheLogItemCtrl.onSubmit(e, props.isUpdate)}>
      <FormLayoutGroup>
        <FormItem htmlFor="caption" top="Название">
          <Input
            id="caption"
            defaultValue={Store.getInstance().cacheLogItemStore.info.data?.caption}
          />
        </FormItem>
        <FormItem top="Описание">
        </FormItem>
        {props.contractorForm && props.contractorForm}
        <FormItem>
          <Button type="submit">Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
