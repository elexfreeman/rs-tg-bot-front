import { FC, memo, useEffect, useState } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderBack,
  SimpleCell,
  InfoRow,
  Header,
  Title,
  CellButton,
  Separator,
} from '@vkontakte/vkui';
import { Icon20GearOutline, Icon28AddOutline } from '@vkontakte/icons';
import { ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { useProjectStore } from 'src/store/project.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ProjectInfo: FC<NavIdProps> = memo((props: NavIdProps) => {
  const projectStore = useProjectStore();
  const projectCtrl = ProjectCtrl.getInstance();
  const params = useParams<'project_id'>();
  const cacheTable = Array(10);
  for (let k = 0; k < 10; k++) {
    cacheTable.push(k);
  }
  const [table] = useState(cacheTable);

  useEffect(() => {
    projectCtrl.infoProject(Number(params?.project_id));
  }, []);

  const project: Partial<ProjectI> = {
    ...projectStore.info.data,
  };

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
      >
        Проект
      </PanelHeader>
      <Group>
        <SimpleCell multiline>
          <Title level="2">{project.caption}</Title>
        </SimpleCell>
      </Group>
      <Group header={<Header mode="secondary">Информация о проекте</Header>}>
        <SimpleCell multiline>
          <InfoRow header="Общий бюджет">3000 р.</InfoRow>
        </SimpleCell>
        <SimpleCell multiline>{project.description}</SimpleCell>
        <CellButton
          onClick={() => projectCtrl.goToUpdateProject(project.id)}
          before={<Icon20GearOutline />}
        >
          Настроить проект
        </CellButton>
      </Group>
      <Group mode="plain" header={<Header mode="secondary">Платежи</Header>}>
          <CellButton
            onClick={() => projectCtrl.goToAddCache()}
            before={<Icon28AddOutline />}
          >
            Добавить платеж
          </CellButton>
        {table.map(() => (
          <>
            <div className="table-cache">
              <div className="table-cache-item">
                <div className="table-cache-item__date">
                  <div className="table-cache-item__dot">
                    <div className="color-dot"></div>
                  </div>
                  <div>02.09.24</div>
                </div>
                <div className="table-cache-item__summa">240 000</div>
              </div>
              <div>Покупки стройматериалов для ремонта</div>
            </div>

            <Separator />
          </>
        ))}
      </Group>
      <div style={{ padding: '100px 0' }}></div>
    </Panel>
  );
});

ProjectInfo.displayName = 'ProjectInfo';
