import { Provider } from "react-redux";
import { store } from "@/store/store";
import UserManagement from "@/components/home";

const App = () => (
  <Provider store={store}>
    <UserManagement />
  </Provider>
);

export default App;
