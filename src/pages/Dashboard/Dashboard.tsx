import { FC, memo } from 'react'
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

export const Dashboard: FC<NavIdProps> = memo((props: NavIdProps) => {
  const onClick = async () => {
    const data = await apiRequset()({
      method: 'post',
      url: '/user/init',
      data: {
        id: 20,
        username: '@test_user',
        language_code: 'ru',
      },
    })
    console.log(data)
  }
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">PanelHeader</PanelHeader>
      <Group description="Внутри Group">
        <Button onClick={() => onClick()}>Send to server</Button>
        <CardGrid size="l">
          <ContentCard
            subtitle="Пользователи: @alex, @john, @marta"
            header="Проект 1"
            caption="Такой то проект реализованный для разных целей и потребностей населения. А также прочих ценностей"
          />
          <ContentCard
            subtitle="VKUI"
            header="ContentCard example"
            caption="VKUI Styleguide > Blocks > ContentCard"
            mode="tint"
          />
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
