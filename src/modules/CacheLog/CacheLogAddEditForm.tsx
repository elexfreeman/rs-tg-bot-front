import { useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CacheLogCtrl } from './cacheLog_ctrl';
import { CacheLogI } from 'src/api/cacheLog_api';


export const CacheLogAddEditForm = (props: {
  cacheLog?: Partial<CacheLogI>;
  isUpdate?: boolean;
  contractorForm: React.ReactNode;
}) => {
  const cacheLogCtrl = CacheLogCtrl.getInstance();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: props.cacheLog,
    values: props.cacheLog,
  });

  const onSubmit: SubmitHandler<Partial<CacheLogI>> = (
    data: Partial<CacheLogI>
  ) => {
    if (props.isUpdate) {
      cacheLogCtrl.updateCacheLog(data);
    } else {
      cacheLogCtrl.addCacheLog(data);
    }
  };

  useEffect(() => {
    register('caption');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayoutGroup>
        <Controller name="id" control={control} render={() => <></>} />
        <FormItem
          htmlFor="caption"
          top="Название"
          status={errors.caption ? 'error' : 'default'}
        >
          <Controller
            name="caption"
            rules={{ required: true }}
            control={control}
            render={({ field }) => <Input id="caption" {...field} />}
          />
        </FormItem>
        <FormItem top="Описание">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="Описание проекта..." {...field} />
            )}
          />
        </FormItem>
        {props.contractorForm && props.contractorForm}
        <FormItem>
          <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
        </FormItem>
      </FormLayoutGroup>
    </form>
  );
};
