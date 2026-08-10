import AppWrapper from '@/router/appWrapper'
import Cursor from '@/components/Cursor/Cursor'
import { store } from '@/redux/store'
import { ModalProvider } from './context/modal-context'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ModalProvider>
          <AppWrapper />
        </ModalProvider>
        <Cursor />
      </Provider>
    </>
  )
}

export default App
