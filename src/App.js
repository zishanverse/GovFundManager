import { Toaster } from "react-hot-toast";
import "./App.css";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAllocation from './pages/CreateAllocation';
import Allocations from './pages/Allocations';
import Allocation from './pages/Allocation';
import NotFound from './pages/NotFound';

const App = () => {
  const wa = localStorage.getItem("wallet");
  const [wallet, setWallet] = useState(wa === null ? undefined : wa);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(wa);
  
  const updateWallet = (wallet) => {
    setWallet(wallet);
    localStorage.setItem("wallet", wallet)
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
    

  };

  return (
    <div className="app">
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      <Routes>
        <Route exact path="/connect" element={<Login wallet={wallet} />} />
        <Route exact path="/" element={<Home wallet={wallet} />} />
        <Route exact path="/create-allocation" element={<CreateAllocation wallet={wallet} />} />
        <Route exact path="/allocations" element={<Allocations />} />
        <Route exact path="/allocations/:name" element={<Allocation />} />
        <Route exact path="/bad-path" element={<NotFound />} />
        <Route exact path="*" element={<Login wallet={wallet} />} />
      </Routes>
    </div>
  );
}

export default App;
