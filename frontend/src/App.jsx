import Navbar from "./components/Navbar";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "./screen/Dashboard";
import Dictionary from "./screen/Dictionary";
import ManualMapping from "./screen/ManualMapping";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/manual-mapping" element={<ManualMapping />} />
      </Routes>
    </>
  );
};

export default App;
