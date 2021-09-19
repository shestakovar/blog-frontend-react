import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import LoaderError from "./components/UI/LoaderError";
import { useAction } from "./hooks/useAction";

function App() {
  const { refreshUser } = useAction();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector(state => state.isAuth)

  useEffect(() => {
    if (localStorage.getItem('token'))
      refreshUser();
    else
      setIsLoading(false);
  }, [])

  useEffect(() => {
    if (isLoading && isAuth)
      setIsLoading(false);
  }, [isAuth])

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
