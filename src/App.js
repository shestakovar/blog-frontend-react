import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import Footer from "./components/UI/Footer";
import LoaderError from "./components/UI/LoaderError";
import { useAction } from "./hooks/useAction";
import AuthService from "./services/AuthService";
import { fillLocalStorage } from "./store/localStorage";
import classes from './App.module.css';


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
      <div className={classes.container}>
        <Header />
        <div className={classes.main}>
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
