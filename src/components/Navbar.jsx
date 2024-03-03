import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { truncateStr } from "../utils/truncateStr";
import '../pages/styles/login.css';
const Navbar = ({ updateWallet, showConnectModal, wallet }) => {
  const [toggleValue, setToggle] = useState(false);
  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
  }, [toggleValue]);

  return (
    <nav className={toggleValue ? 'navbar nav' : 'navbar nav nav-container'}>
      <div className="nav__header flex">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close burger-style") || "nav__burger burger-style"
          }
        >
          <div className={toggleValue ? 'burger-style' : ''}></div>
          <div></div>
          <div className={toggleValue ? 'burger-style' : ''}></div>
        </div>
        <div className="navbar__logo nav-text" href="/">
          <Link to="/" ><img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7cxis9QRUPjhTfz39gHazF-1CET3TKHcRP2yDTr_P7W63A6_NgbBVzmgTZ9hYhJJiBM&usqp=CAU" alt="logo" /></Link>
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded nav-container") || "nav__links"
        }
      >
        <Link to="/"><p className="nav-text">Home</p></Link>
        <Link to="/add-allocation"><p className="nav-text">Add Allocation</p></Link>
        <Link to="/allocations" ><p className="nav-text">Allocations</p></Link>
        <button
          className="connect-btn wallet-btn"
          onClick={wallet ? () => updateWallet() : () => {
            showConnectModal(true);
            //Cookies.remove("wallet")
          }}
        >
          {wallet
            ? `Disconnect: ${wallet && truncateStr(wallet.getAddress(), 11)}`
            : "Connect"}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
