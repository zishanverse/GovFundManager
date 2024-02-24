
import logic from "../interface/logic";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import {useState} from 'react';
import Modal from 'react-modal';
import './styles/allocation.css';
// This page opens to view individual allocation

// People can view amount-spent and purpose
// People can add immutable comments
// Check if connected wallet is creator of allocation and only he can update
// amount spent from this page
const customStyles = {
    content: {
      padding: '10px',
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
            toastInfo("Adding Spend Amount...");
            await logic.UpdateAmountSpent(wallet, key , amountSpen);
            toastSuccess("Successfully Added");
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
            toastInfo("Adding Comment...");
            await logic.AddComment(wallet, key , comment);
            toastSuccess("Successfully Added");
            setIsOpen2(false);
            setComment("");
          }
          catch (error) {
            setIsOpen2(false);
            setComment("");
            toastError(error.message);
          }
      }
    
  const changeAmountSpend = event => {
    if (Number.isNaN(parseInt(event.target.value))) {
      setAmountSpent("");
    }
    else {
      setAmountSpent(parseInt(event.target.value))
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
            <button onClick={openModal} className="form-btn">Update</button>
            <button onClick={openModal2} className="form-btn">comments</button>
            </div>
            <Modal
            isOpen={modalIsOpen2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-container">
            <h2 className="form-name">previous Comments</h2>
            <ol>
                {comments.map(each => <li className="comment">{each.comment}</li>)}
            </ol>
            <div>
              <label className="modal-label">Enter your comment</label>
              <textarea  rows="15" cols="25" onChange={(e) => setComment(e.target.value)} placeholder="Enter your Comment  " value={comment}/>
            </div>
            <button onClick={AddComment}>Done</button>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-container">
            <h2 className="form-name">Allocation</h2>
            <div>
              <label className="modal-label">Enter Amount Spend</label>
              <input className="form-input" type="text" onChange={changeAmountSpend} placeholder="Enter Allocation Spend Amount" value={String(amountSpen)}/>
            </div>
            
            <button onClick={changeFund}>Done</button>
            </div>
          </Modal>
        </li>
    )
}

export default Allocation