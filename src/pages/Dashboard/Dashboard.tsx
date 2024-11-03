import { FC, memo, useEffect } from 'react'
import {
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui'
import { Icon28AddOutline } from '@vkontakte/icons'
import { DashboardCtrl } from './dashboard_ctrl'
import { PageProps } from 'src/system/PageProps';

export const Dashboard: FC<PageProps<DashboardCtrl>> = memo((props: PageProps<DashboardCtrl>) => {

  useEffect(() => {
    props.ctrl.projectList();
  }, [])

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">Проекты</PanelHeader>
      <Group>
        <CardGrid size="l">
          <CellButton
            onClick={() => props.ctrl.goToNewProject()}
            before={<Icon28AddOutline />}
          >
            Добавить проект
          </CellButton>
          {props.ctrl.projectStore.list?.data?.map((item) => (
            <ContentCard
              key={item.id}
              subtitle=""
              header={item.caption}
              caption={item.description}
            />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  )
})

Dashboard.displayName = 'Store'
