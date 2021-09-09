import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./services/AuthService";
import Header from "./components/Header"
import Router from "./components/Router";
import { AuthContext } from "./context";
import { useFetching } from "./hooks/useFetching";
import LoaderError from "./components/LoaderError";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [checkAuth, isResponseLoading, error] = useFetching(async () => {
    const response = await AuthService.refresh();
    localStorage.setItem('token', response.access);
    setIsAuth(true);
  })

  const checkLoad = async () => {
    await checkAuth();
    if (!isAuth)
      localStorage.removeItem('username');
    setIsLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkLoad();
    }
    else {
      setIsLoading(false);
    }
  }, [])
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
