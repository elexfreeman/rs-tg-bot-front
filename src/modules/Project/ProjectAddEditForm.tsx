import { FC, memo, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { ProjectI } from 'src/api/project_api';

interface ProjectAddEditFormPops {
  project?: Partial<ProjectI>;
  isUpdate?: boolean;
}

export const ProjectAddEditForm: FC<ProjectAddEditFormPops> = memo(
  (props: ProjectAddEditFormPops) => {
    const projectCtrl = ProjectCtrl.getInstance();

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: props.project,
      values: props.project,
    },);

    const onSubmit: SubmitHandler<Partial<ProjectI>> = (
      data: Partial<ProjectI>
    ) => {
      if (props.isUpdate) {
        projectCtrl.updateProject(data);
      } else {
        projectCtrl.addProject(data);
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
