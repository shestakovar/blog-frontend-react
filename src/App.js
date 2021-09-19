import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import LoaderError from "./components/UI/LoaderError";
import { useAction } from "./hooks/useAction";

function App() {
  const { refreshUser, logoutUser } = useAction();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector(state => state.isAuth);
  const error = useSelector(state => state.error);

  useEffect(() => {
    if (localStorage.getItem('token'))
      refreshUser();
    else
      setIsLoading(false);
  }, [])

  useEffect(() => {
    if (error === 'Token is invalid or expired') {
      logoutUser();
      setIsLoading(false);
    }
    if (isLoading && isAuth)
      setIsLoading(false);
  }, [isAuth, error])

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
