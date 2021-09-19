import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import LoaderError from "./components/UI/LoaderError";
import { useAction } from "./hooks/useAction";
import AuthService from "./services/AuthService";
import { fillLocalStorage } from "./store/localStorage";


function App() {
  const { logoutUser, setAccessToken } = useAction();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wrapper = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await AuthService.refresh();
          fillLocalStorage(null, response.access, null);
          setAccessToken(response.access);
        }
        catch (e) {
          logoutUser();
        }
      }
      setIsLoading(false);
    }
    wrapper();

  }, [])

  if (isLoading)
    return <LoaderError isLoading={isLoading}></LoaderError>

  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
