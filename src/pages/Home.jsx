import { useState, useEffect } from "react";
import logic from "../interface/logic";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import { Toaster } from "react-hot-toast";
import {Circles} from 'react-loader-spinner';
import Modal from 'react-modal';
import {Navigate, Link} from 'react-router-dom';
import "./home.css";
import Allocation from "./Allocation";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Home = ({ wallet }) => {
  const [amountSpent, setAmountSpent] = useState("");
  const [updateFund, setUpdateFund] = useState("");
  const [list, setList] = useState([]);
  const [fundId, setFundId] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  
  

  

  
  const changeAmountSpent = (e) => setAmountSpent(parseInt(e.target.value));

  

  const changeFund = async () => {
    const { lists } = await logic.GetAllocations();
    console.log(lists);
    setAmountSpent((pre) => pre + updateFund);

    const found = lists.find((each) => each.id === fundId);
    if (found === undefined) {
      setError(true);
    } else {
      setError(false);
      await logic.UpdateAmountSpent(wallet, fundId, updateFund);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    
      try {
        const {allocations} = await logic.GetAllocations();
        console.log(allocations);
        const update = []
        for (let each of allocations.entries()) {
          update.push({...each[1], key: each[0]});
        };
        console.log(update);
        setList(update);
        
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        toastError(error.message);
      }
    
  }

  

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  

  
  if (wallet === undefined) {
    return <Navigate replace to={"/connect"} />
  }
    return (
      <>
      <Toaster />
        <div className="home-container">
          {loading ? <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> : <><img src="https://www.icicidirect.com/images//Fund%20manager-202210281647246454795.png" alt="gov" className="gov-logo" />
  <h1>Gov Fund Manager</h1>
  <Link to="/create-allocation" ><button >Add Allocation</button></Link>
  <h1 className="head">List of Allocations</h1>
  <ul className="pre-allocations">
    {list.map(each => <Allocation key={each.key} item={each}/>)}
  </ul>
  </>}
          
          </div>
      </>
      );


 
};

export default Home;