import { FormLayoutGroup, FormItem, Input } from '@vkontakte/vkui';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';

export const CacheLogItemAddEditForm = (props: {
  data: Partial<CacheLogItemI>;
  dataDefault: Partial<CacheLogItemI>;
  onChange: (item: Partial<CacheLogItemI>) => void;
}) => {
  return (
    <FormLayoutGroup>
        <Input
          id="id"
          key={props.dataDefault.id}
          defaultValue={props.dataDefault.id}
          hidden
        />
      <FormItem htmlFor="caption" top="Название">
        <Input
          id="caption"
          key={props.dataDefault.caption}
          defaultValue={props.dataDefault.caption}
          onChange={(event) =>
            props.onChange({ ...props.data, caption: event.target.value })
          }
        />
      </FormItem>
      <div className="flex-col">
        <FormItem htmlFor="price" top="Цена">
          <Input
            id="price"
            key={props.dataDefault.price}
            defaultValue={props.dataDefault.price}
            onChange={(event) =>
              props.onChange({
                ...props.data,
                price: Number(event.target.value),
              })
            }
          />
        </FormItem>
        <FormItem htmlFor="count" top="Количество">
          <Input
            id="count"
            key={props.dataDefault.count}
            defaultValue={props.dataDefault.count}
            onChange={(event) =>
              props.onChange({
                ...props.data,
                count: Number(event.target.value),
              })
            }
          />
        </FormItem>
      </div>
    </FormLayoutGroup>
  );
};
