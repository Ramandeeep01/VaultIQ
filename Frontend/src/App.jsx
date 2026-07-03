import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import VaultDetails from "./Pages/VaultDetails";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vault/:vaultId" element={<VaultDetails />} />
      </Routes>
  );
}

export default App;