import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';


export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();

  return (
    <form onSubmit={(e) => cacheLogCtrl.onSubmit(e)}>
      <FormLayoutGroup>
        <FormItem
          htmlFor="caption"
          top="Название"
        >
         <Input id="caption" />
        </FormItem>
        <FormItem top="Описание">
         <Textarea placeholder="Описание проекта..." />
        </FormItem>
        {props.contractorForm && props.contractorForm}
        <FormItem>
          <Button type='submit'>Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
