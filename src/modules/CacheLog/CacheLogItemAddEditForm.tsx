import { FormLayoutGroup, FormItem, Input } from '@vkontakte/vkui';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';

export const CacheLogItemAddEditForm = (props: {
  data: CacheLogItemI;
  dataDefault: CacheLogItemI;
  onChange: (item: CacheLogItemI) => void;
}) => {
  return (
    <FormLayoutGroup>
        <input
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
            type='number'
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
            type='number'
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
