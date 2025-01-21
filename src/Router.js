import { Routes, Route } from "react-router";
import Home from "./components/Home";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
  );
}

export default Router