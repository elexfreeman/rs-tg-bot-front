import { FC, memo } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { ContractorI } from 'src/api/contractor_api';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';

interface ContractorAddEditFormPops {
  contractor?: Partial<ContractorI>;
  isUpdate?: boolean;
}

export const ContractorAddEditForm: FC<ContractorAddEditFormPops> = memo(
  (props: ContractorAddEditFormPops) => {
    return (
      <form onSubmit={(e) => ContractorCtrl.getInstance().onSubmit(e, props.isUpdate)}>
        <input type="hidden" name="id" value={props.contractor?.id} />
        <FormLayoutGroup>
          <FormItem
            htmlFor="caption"
            top="Название"
            value={props.contractor?.caption}
          >
            <Input name="caption" />
          </FormItem>
          <FormItem top="Описание">
            <Textarea
              name="description"
              placeholder="Описание проекта..."
              value={props.contractor?.description}
            />
          </FormItem>
          <FormItem>
            <Button type="submit">Сохранить</Button>
          </FormItem>
        </FormLayoutGroup>
      </form>
    );
  }
);
