
import logic from "../interface/logic";
import {toastError } from "../utils/toastWrapper";
import { Toaster } from "react-hot-toast";
import {useState} from 'react';
import Modal from 'react-modal';
// This page opens to view individual allocation

// People can view amount-spent and purpose
// People can add immutable comments
// Check if connected wallet is creator of allocation and only he can update
// amount spent from this page
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
  

const Allocation = props => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [amountSpen, setAmountSpent] = useState("");
  const [comment, setComment] = useState("");
  const {item, wallet} = props
  const {amountAllocated, amountSpent, purpose, comments, key} = item

 

    const changeFund = async () => {
        try {
            const response = await logic.UpdateAmountSpent(wallet, key , amountSpen);
            setIsOpen(false);
            setAmountSpent(0);
          }
          catch (error) {
            closeModal();
            setAmountSpent(0);
            toastError(error.message);
          }
      };

      const AddComment = async () => {
        try {
            const response = await logic.AddComment(wallet, key , comment);
            setIsOpen2(false);
            setAmountSpent(0);
          }
          catch (error) {
            setIsOpen2(false);
            toastError(error.message);
          }
      }
    
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
    return (
        <li className="allocation-item">
            <p className="allocation-text">Name: {key}</p>
            <p>Amount Allocated: {amountAllocated}</p>
            <p>Amount Spent: {amountSpent}</p>
            <p>Purpose: {purpose}</p>
            
            <div className="btns">
            <button onClick={openModal}>Update</button>
            <button onClick={openModal2}>comments</button>
            </div>
            <Modal
            isOpen={modalIsOpen2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="form-container">
            <h2 className="form-name">previous Comments</h2>
            <ol>
                {comments.map(each => <li>{each}</li>)}
            </ol>
            <label>Enter your comment</label>
            <textarea onChange={(e) => setComment(e.target.value)} placeholder="Enter your Comment  " value={comment}/>
            
            <button onClick={AddComment}>Done</button>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="form-container">
            <h2 className="form-name">Allocation</h2>
            <label>Enter Allocation Spend Amount</label>
            <input type="text" onChange={(e) => setAmountSpent(parseInt(e.target.value))} placeholder="Enter Allocation Spend Amount" value={String(amountSpen)}/>
            
            <button onClick={changeFund}>Done</button>
            </div>
          </Modal>
        </li>
    )
}

export default Allocation