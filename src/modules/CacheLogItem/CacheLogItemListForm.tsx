import { useEffect, useState } from 'react';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import CacheLogItemStore from 'src/store/cacheLogItem.store';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm } from 'src/modules/CacheLogItem/CacheLogItemAddEditForm';
import { Result } from 'src/system/error_sys';
import { getCacheLogItemListApi } from 'src/api/cacheLogItem_api';

/**
 *
 * Шаги работы табличной части
 * Заполняем данные из базы в стор если это update
 * Если есть данные в базе то заполняем дефолтные значения
 * При вводе данных сохраняем в локальную переменную и в стор
 *
 * */
export const CacheLogItemListForm = (props: { cacheLogId?: number }) => {
  const cacheLogItemStore = CacheLogItemStore.useStore();

  const [data, setData] = useState<Partial<CacheLogItemI>[]>([]);
  const [dataDefault, setDataDefault] = useState<Partial<CacheLogItemI>[]>([]);

  const saveStore = (listData?: Partial<CacheLogItemI>[]) => {
    CacheLogItemStore.setStore({
      ...cacheLogItemStore,
      listUpdate: Result.setData(listData || []),
    });
  };

  const cacheLogItemList = async(cacheLogId: number) => {
    const out = await getCacheLogItemListApi(cacheLogId);
    cacheLogItemStore.list = out;
    CacheLogItemStore.setStore ({
      ...cacheLogItemStore,
    });
    return out;
  }

  useEffect(() => {
    if (props.cacheLogId) {
      // заполняем инфу об позициях платежа из базы
      cacheLogItemList(props.cacheLogId).then((data) => {
        setDataDefault(data?.data || []);
        setData(data?.data || []);
        saveStore(data?.data);
      });
    }
  }, []);

  const onUpdateData = (idx: number, _data: Partial<CacheLogItemI>) => {
    data[idx] = _data;
    setData([...data]);

    const listUpdate = cacheLogItemStore.listUpdate.data || [];
    listUpdate[idx] = _data;
    saveStore(listUpdate);
  };

  const onAddItem = () => {
    data.push({});
    setData([...data]);

    const listData = cacheLogItemStore.listUpdate.data || [];
    listData.push({});
    saveStore(listData);
  };

  return (
    <Group mode="plain" header={<Header mode="secondary">Позиции</Header>}>
      <CellButton before={<Icon28AddOutline />} onClick={() => onAddItem()}>
        Добавить
      </CellButton>
      {data.map((item, idx) => (
        <div key={idx}>
          <CacheLogItemAddEditForm
            data={item}
            dataDefault={dataDefault[idx] || {}}
            onChange={(data) => onUpdateData(idx, data)}
          />
          <Separator />
        </div>
      ))}
    </Group>
  );
};

CacheLogItemListForm.displayName = 'CacheLogItemListForm';
