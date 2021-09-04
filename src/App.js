import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header"
import Router from "./components/Router";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
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
