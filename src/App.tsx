import { usePath } from './lib/router'
import { Reading } from './screens/Reading'
import { Result } from './screens/Result'
import { Start } from './screens/Start'

export default function App() {
  const path = usePath()

  switch (path) {
    case '/reading':
      return <Reading />
    case '/result':
      return <Result />
    default:
      return <Start />
  }
}
