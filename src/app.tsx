// Components
import Navbar from "@/components/shared/navbar";

// Pages
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Dashboard from "./pages/dashboard";

// rrd imports
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
