import { FC, memo, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorI } from 'src/api/contractor_api';

interface ContractorAddEditFormPops {
  contractor?: Partial<ContractorI>;
  isUpdate?: boolean;
}

export const ContractorAddEditForm: FC<ContractorAddEditFormPops> = memo(
  (props: ContractorAddEditFormPops) => {
    const contractorCtrl = ContractorCtrl.getInstance();

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: props.contractor,
      values: props.contractor,
    },);

    const onSubmit: SubmitHandler<Partial<ContractorI>> = (
      data: Partial<ContractorI>
    ) => {
      if (props.isUpdate) {
        contractorCtrl.updateContractor(data);
      } else {
        contractorCtrl.addContractor(data);
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
          <FormItem>
            <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
          </FormItem>
        </FormLayoutGroup>
      </form>
    );
  }
);
