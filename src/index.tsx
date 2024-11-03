import { createRoot } from 'react-dom/client'
import { AppConfig } from './AppConfig'

/** Подключаем стили vkui из собранной папки dist в node_modules/vkontakte/vkui/ */
import '@vkontakte/vkui/dist/vkui.css'

/** Подключаем кастомные глобальные стили */
import 'src/index.css'


const container = document.getElementById('root')
const root = container && createRoot(container)
root && root.render(<AppConfig />)
