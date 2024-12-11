import { FormLayoutGroup, FormItem, Input, Button } from '@vkontakte/vkui';
import { CacheLogItemCtrl } from './cacheLogItem_ctrl';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { Store } from 'src/store/store';

export const CacheLogItemAddEditForm = (props: {
  cacheLogItem?: Partial<CacheLogItemI>;
  isUpdate?: boolean;
}) => {
  const cacheLogItemCtrl = CacheLogItemCtrl.getInstance();

  return (
    <form onSubmit={(e) => cacheLogItemCtrl.onSubmit(e, props.isUpdate)}>
      <FormLayoutGroup>
        <FormItem htmlFor="caption" top="Название">
          <Input
            id="caption"
            defaultValue={
              Store.getInstance().cacheLogItemStore.info.data?.caption
            }
          />
        </FormItem>
        <FormItem htmlFor="price" top="Цена">
          <Input
            id="price"
            key={Store.getInstance().cacheLogItemStore.info.data?.price}
            defaultValue={
              Store.getInstance().cacheLogItemStore.info.data?.price
            }
          />
        </FormItem>
        <FormItem htmlFor="count" top="Количество">
          <Input
            id="count"
            key={Store.getInstance().cacheLogItemStore.info.data?.count}
            defaultValue={
              Store.getInstance().cacheLogItemStore.info.data?.count
            }
          />
        </FormItem>
        <FormItem>
          <Button type="submit">Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
