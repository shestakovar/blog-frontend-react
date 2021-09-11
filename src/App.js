import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./services/AuthService";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import { useFetching } from "./hooks/useFetching";
import LoaderError from "./components/UI/LoaderError";
import store, { logoutAction, refreshAction } from "./store/store";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [checkAuth, isResponseLoading, error] = useFetching(async () => {
    const response = await AuthService.refresh();
    store.dispatch(refreshAction(response));
  })

  useEffect(() => {
    const wrapper = async () => {
      if (localStorage.getItem('token')) {
        await checkAuth();
        if (error)
          store.dispatch(logoutAction())
      }
      setIsLoading(false);
    }
    wrapper();
  }, [])

  if (isLoading)
    return <LoaderError isLoading={isLoading}></LoaderError>

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
