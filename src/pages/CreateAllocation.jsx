import { useState } from "react";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import { Toaster } from "react-hot-toast";
import {Navigate} from 'react-router-dom'
import logic from "../interface/logic";


const CreateAllocation = props => {
  const [allocationName, setFundName] = useState("");
  const [amountAllocated, setAmountAllocated] = useState("");
  const [purpose, setPurpose] = useState("");
  const {wallet} = props

  const changeFundName = (e) => {
    setFundName(e.target.value);
  };
  const changePurpose = (e) => setPurpose(e.target.value);


  const changeAmountAllocated = (e) =>
    setAmountAllocated(parseInt(e.target.value));


    const addToList = async (e) => {
        e.preventDefault();
        const {history} = props
        
        try {   
          toastInfo("Adding Todo ...");
          await logic.CreateAllocations(wallet,allocationName, purpose, amountAllocated);
          toastSuccess("Successfully Added");
          setFundName("");
          setPurpose("");
          setAmountAllocated('');
          history.replace("/");
        } catch (error) {
          toastError(error.message);
        }
      };

      if (wallet === undefined) {
        return <Navigate replace to={"/connect"} />
      }

    return (
        <form onSubmit={addToList}>
          <h2 className="state">Fund Name</h2>
          <input type="text" value={allocationName} onChange={changeFundName} />
          <h2 className="">Amount Allocated</h2>
          <input
            type="text"
            value={amountAllocated}
            onChange={changeAmountAllocated}
          />
          <h2>purpose</h2>
          <input type="text" value={purpose} onChange={changePurpose} />
          
          <br />
          <br />
          <button type="submit">Add to Allocated</button>
        </form>
    )
}

export default CreateAllocation