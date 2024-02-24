import { useState } from "react";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import {Navigate} from 'react-router-dom';
import AppContext from "../Context/context";
import logic from "../interface/logic";
import './styles/createAllocation.css';

const CreateAllocation = () => {
  const [allocationName, setFundName] = useState("");
  const [amountAllocated, setAmountAllocated] = useState('');
  const [purpose, setPurpose] = useState("");
  

  const changeFundName = (e) => {
    setFundName(e.target.value);
  };
  const changePurpose = (e) => setPurpose(e.target.value);


  const changeAmountAllocated = (e) => {
    if (Number.isNaN(parseInt(e.target.value))) {
      setAmountAllocated("");
    }
    else {
      setAmountAllocated(parseInt(e.target.value));
    }
  }
    


    

      return (
        <AppContext.Consumer>
          {value => {
            const {wallet} = value;

            const addToList = async (e) => {
              e.preventDefault();
              
              try {   
                toastInfo("Adding Todo ...");
                await logic.CreateAllocations(wallet,allocationName, purpose, amountAllocated);
                toastSuccess("Successfully Added");
                setFundName("");
                setPurpose("");
                setAmountAllocated('');
              } catch (error) {
                toastError(error.message);
              }
            };

            if (wallet === undefined) {
              return <Navigate replace={true} to={"/connect"} />
            }
      
          return (
              <form className="home-container" onSubmit={addToList}>
                <div className="form-container">
                <h2 className="form-text">Fund Name</h2>
                <input type="text"
                className="form-input" value={allocationName} onChange={changeFundName} />
                <h2 className="form-text">Amount Allocated</h2>
                <input
                  type="text"
                  className="form-input"
                  value={amountAllocated}
                  onChange={changeAmountAllocated}
                />
                <h2 className="form-text">purpose</h2>
                <input type="text"
                className="form-input" value={purpose} onChange={changePurpose} />
                
                <br />
                <br />
                <button type="submit" className="connect-btn">Add to Allocated</button>
                </div>
              </form>
          )
          }}
        </AppContext.Consumer>
      )
}

export default CreateAllocation