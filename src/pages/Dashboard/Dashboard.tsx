import { FC, memo, useEffect } from 'react'
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  Card,
  Spacing,
  ContentCard,
  Button,
} from '@vkontakte/vkui'
import { apiRequset } from 'src/api/api'
import { useProjectStore, setProjectStore } from '../../store/project.store'

export const Dashboard: FC<NavIdProps> = memo((props: NavIdProps) => {
  const onClick = async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/project/list',
      data: {},
    })
    console.log(data)
  }

  const projectStore = useProjectStore();

  useEffect(() => {
    console.log('I have been mounted')
    apiRequset()({
      method: 'post',
      url: '/project/list',
      data: {},
    }).then((data) => {
      const list = data.data.list;
      console.log(list);
      setProjectStore({ list });
    })
  }, [])

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">PanelHeader</PanelHeader>
      <Group description="Внутри Group">
        <Button onClick={() => onClick()}>Send to server</Button>
        <CardGrid size="l">
        {projectStore.list?.map(item => (
          <ContentCard
            key={item.id}
            subtitle=""
            header={item.caption}
            caption={item.description}
          />
        ))}
        </CardGrid>
        <CardGrid size="s">
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
        </CardGrid>
      </Group>
      <CardGrid size="m">
        <Card>
          <div style={{ paddingBottom: '62%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '62%' }} />
        </Card>
      </CardGrid>
      <CardGrid size="l">
        <Card>
          <div style={{ paddingBottom: '30%' }} />
        </Card>
      </CardGrid>
      <CardGrid size="l" spaced>
        <Card>
          <div style={{ paddingBottom: '30%' }} />
        </Card>
      </CardGrid>
      <Spacing size={16} />
    </Panel>
  )
})

Dashboard.displayName = 'Store'
