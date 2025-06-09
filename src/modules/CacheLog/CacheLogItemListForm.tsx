import { useEffect, useState } from 'react';
import { Group, CellButton, Header, Separator } from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import TableItemStore from 'src/store/cacheLogItem.store';
import HeadStore from 'src/store/cacheLog.store';
import { CacheLogItemI as TableItemI, cacheLogItemDefault as tableItemDefault } from 'src/Entity/CacheLogItemE';
import { CacheLogItemAddEditForm as TableEditForm } from 'src/modules/CacheLog/CacheLogItemAddEditForm';
import { Result } from 'src/system/error_sys';
import { getCacheLogItemListApi as getTableListApi } from 'src/api/cacheLogItem_api';

/**
 *
 * Шаги работы табличной части
 * Заполняем данные из базы в стор если это update
 * Если есть данные в базе то заполняем дефолтные значения
 * При вводе данных сохраняем в локальную переменную и в стор
 *
 * */
export const CacheLogItemListForm = () => {
  const tableItemStore = TableItemStore.useStore();

  // == локальные данные ==
  // заполняемые данные
  const [data, setData] = useState<TableItemI[]>([]);
  // данные по умолчанию
  const [dataDefault, setDataDefault] = useState<TableItemI[]>([]);
  // id шапки
  const [headId, setHeadId] = useState<number | undefined>(0);

  // == utils ==
  // запись данных в стор
  const saveStore = (listData?: TableItemI[]) => {
    TableItemStore.setStore({
      ...tableItemStore,
      list: Result.setData(listData || []),
    });
  };

  // == actions ==
  // заполение списока данных табличной части
  const listAction = async (cacheLogId: number) => {
    tableItemStore.list = await getTableListApi(cacheLogId);
    TableItemStore.setStore ({
      ...tableItemStore,
    });
    // заполняем инфу об позициях платежа из базы
    setDataDefault(tableItemStore.list?.data || []);
    setData(tableItemStore.list?.data || []);
    saveStore(tableItemStore.list?.data);
  }

  // событие изменения данных пользователем
  const onChangeDataAction = (idx: number, _data: TableItemI) => {
    data[idx] = _data;
    setData([...data]);

    const list = tableItemStore.list.data || [];
    list[idx] = _data;
    saveStore(list);
  };

  // событие добавления строки табличной части
  const onAddItemAction = () => {
    data.push(tableItemDefault);
    setData([...data]);

    const listData = tableItemStore.list.data || [];
    listData.push(tableItemDefault);
    saveStore(listData);
  };

  // == subscribe == 
  // Подписка на изменения id шапки
  HeadStore.change.subscribe((state) => {
    if(state.info.data?.id !== headId) {
      setHeadId(state.info.data?.id);
    }
  });
  // подписка на изменения id шапки
  useEffect(() => {
    if (headId) {
      listAction(headId);
    }
  }, [headId]);


  return (
    <Group mode="plain" header={<Header mode="secondary">Позиции</Header>}>
      <CellButton before={<Icon28AddOutline />} onClick={() => onAddItemAction()}>
        Добавить
      </CellButton>
      {data.map((item, idx) => (
        <div key={idx}>
          <TableEditForm
            data={item}
            dataDefault={dataDefault[idx] || {}}
            onChange={(data) => onChangeDataAction(idx, data)}
          />
          <Separator />
        </div>
      ))}
    </Group>
  );
};

CacheLogItemListForm.displayName = 'CacheLogItemListForm';
