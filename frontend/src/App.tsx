import AppWrapper from '@/router/appWrapper'
import Cursor from '@/components/Cursor/Cursor'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppWrapper />
        <Cursor />
      </Provider>
    </>
  )
}

export default App
