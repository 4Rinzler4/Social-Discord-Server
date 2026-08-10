import AppWrapper from "@/router/appWrapper";
import Cursor from "@/components/Cursor/Cursor";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/modal-context";

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
  );
};

export default App;
