import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header"
import Router from "./components/Router";
import LoaderError from "./components/UI/LoaderError";
import { useAction } from "./hooks/useAction";

function App() {
  const user = useSelector(state => state);
  const { logoutUser, refreshUser } = useAction();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wrapper = async () => {
      if (localStorage.getItem('token')) {
        await refreshUser();
        if (user.error) {
          await logoutUser();
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
