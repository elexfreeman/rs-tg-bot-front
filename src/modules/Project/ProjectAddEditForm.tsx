import { FC, memo, useEffect } from 'react';
import ProjectStore, { useProjectStore } from 'src/store/project.store';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import {
  updateProjectApi,
  ProjectI
} from 'src/api/project_api';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';

interface ProjectAddEditFormPops {
  project?: Partial<ProjectI>;
  isUpdate?: boolean;
}

export const ProjectAddEditForm: FC<ProjectAddEditFormPops> = memo(
  (props: ProjectAddEditFormPops) => {
    const projectCtrl = ProjectCtrl.getInstance();
    const projectStore = useProjectStore();
    const routeNavigator = useRouteNavigator();

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: props.project,
      values: props.project,
    },);

    const updateProject = async (project: Partial<ProjectI>) => {
      projectStore.update = await updateProjectApi(project);
      ProjectStore.setStore({ ...projectStore });
      if (!projectStore.update.error) {
        routeNavigator.back();
      }
    }

    const onSubmit: SubmitHandler<Partial<ProjectI>> = (
      data: Partial<ProjectI>
    ) => {
      if (props.isUpdate) {
        updateProject(data);
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
