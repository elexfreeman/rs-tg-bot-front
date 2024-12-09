import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { CacheLogCtrl } from './cacheLogItem_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';
import { Store } from 'src/store/store';

export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();

  return (
    <form onSubmit={(e) => cacheLogCtrl.onSubmit(e, props.isUpdate)}>
      <FormLayoutGroup>
        <FormItem htmlFor="caption" top="Название">
          <Input
            id="caption"
            defaultValue={Store.getInstance().cacheLogStore.info.data?.caption}
          />
        </FormItem>
        <FormItem top="Описание">
          <Textarea
            placeholder="Описание проекта..."
            defaultValue={Store.getInstance().cacheLogStore.info.data?.description}
          />
        </FormItem>
        {props.contractorForm && props.contractorForm}
        <FormItem>
          <Button type="submit">Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
