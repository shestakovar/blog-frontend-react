import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header"
import Router from "./components/Router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
