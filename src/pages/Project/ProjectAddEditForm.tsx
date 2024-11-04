import { FC, memo, useEffect } from 'react';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {  ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';

interface ProjectAddEditFormPops {
  project: ProjectI;
}

export const ProjectAddEditForm: FC<ProjectAddEditFormPops> = memo(
  (props: ProjectAddEditFormPops) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: { ...props.project },
    });


    const projectCtrl = ProjectCtrl.getInstance();

    const onSubmit: SubmitHandler<ProjectI> = (data: ProjectI) => {
      projectCtrl.addProject(data);
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
