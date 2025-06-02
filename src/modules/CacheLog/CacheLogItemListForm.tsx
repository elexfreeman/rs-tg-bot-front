import { useEffect, useState } from 'react';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import CacheLogItemStore from 'src/store/cacheLogItem.store';
import CacheLogStore from 'src/store/cacheLog.store';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm } from 'src/modules/CacheLog/CacheLogItemAddEditForm';
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
export const CacheLogItemListForm = () => {
  const cacheLogItemStore = CacheLogItemStore.useStore();
  // const cacheLogStore = CacheLogStore.useStore();

  const [data, setData] = useState<CacheLogItemI[]>([]);
  const [dataDefault, setDataDefault] = useState<CacheLogItemI[]>([]);
  const [cacheLogId, setCacheLogId] = useState<number | undefined>(0);

  CacheLogStore.change.subscribe((state) => {
    if(state.info.data?.id !== cacheLogId) {
      setCacheLogId(state.info.data?.id);
    }
  });

  const saveStore = (listData?: CacheLogItemI[]) => {
    CacheLogItemStore.setStore({
      ...cacheLogItemStore,
      list: Result.setData(listData || []),
    });
  };

  const cacheLogListAction = async (cacheLogId: number) => {
    cacheLogItemStore.list = await getCacheLogItemListApi(cacheLogId);
    CacheLogItemStore.setStore ({
      ...cacheLogItemStore,
    });
    // заполняем инфу об позициях платежа из базы
    setDataDefault(cacheLogItemStore.list?.data || []);
    setData(cacheLogItemStore.list?.data || []);
    saveStore(cacheLogItemStore.list?.data);
  }

  useEffect(() => {
    if (cacheLogId) {
      cacheLogListAction(cacheLogId);
    }
  }, [cacheLogId]);

  const onUpdateData = (idx: number, _data: CacheLogItemI) => {
    data[idx] = _data;
    setData([...data]);

    const list = cacheLogItemStore.list.data || [];
    list[idx] = _data;
    saveStore(list);
  };

  const onAddItem = () => {
    data.push({
      cache_log_id: 0,
      caption: '',
      price: 0,
      count: 0,
    });
    setData([...data]);

    const listData = cacheLogItemStore.list.data || [];
    listData.push({
      cache_log_id: 0,
      caption: '',
      price: 0,
      count: 0,
    });
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
