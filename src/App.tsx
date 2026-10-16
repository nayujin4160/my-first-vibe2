import { usePath } from './lib/router'
import { Account } from './screens/Account'
import { DayCard } from './screens/DayCard'
import { Home } from './screens/Home'
import { Reading } from './screens/Reading'
import { Result } from './screens/Result'
import { Settings } from './screens/Settings'
import { Start } from './screens/Start'

export default function App() {
  const path = usePath()

  const day = path.match(/^\/day\/(\d{4}-\d{2}-\d{2})$/)
  if (day) return <DayCard date={day[1]} />

  switch (path) {
    case '/reading':
      return <Reading />
    case '/result':
      return <Result />
    case '/account':
      return <Account />
    case '/home':
      return <Home />
    case '/settings':
      return <Settings />
    default:
      return <Start />
  }
}
