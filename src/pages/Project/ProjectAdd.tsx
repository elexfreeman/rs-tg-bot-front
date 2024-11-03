import { FC, memo, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  FormLayoutGroup,
  FormItem,
  Input,
  Textarea,
  PanelHeaderBack,
  Button,
} from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { PageProps } from 'src/system/PageProps';

export const ProjectAdd: FC<PageProps<ProjectCtrl>> = memo(
  (props: PageProps<ProjectCtrl>) => {
    const { register, handleSubmit, control } = useForm({
      defaultValues: {
        id: 0,
        caption: '',
        description: '',
      },
    });

    const onSubmit: SubmitHandler<ProjectI> = (data: ProjectI) => {
      props.ctrl.addProject(data);
    };

    useEffect(() => {
      console.log(register('caption'));
    }, []);

    return (
      <Panel className="Panel__fullScreen" {...props}>
        <PanelHeader
          delimiter="none"
          before={<PanelHeaderBack onClick={() => props.ctrl.goBack()} />}
        >
          Новый проект
        </PanelHeader>
        <Group description="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayoutGroup>
              <Controller name="id" control={control} render={() => <></>} />
              <FormItem htmlFor="caption" top="Название">
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
            <div>{String(props.ctrl.projectStore.add?.error)}</div>
          </form>
        </Group>
      </Panel>
    );
  }
);

ProjectAdd.displayName = 'Store';
