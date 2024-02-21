
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
    const {item} = props
    const {amountAllocated, amountSpent, purpose, comments, key} = item

    
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
    return (
        <li className="allocation-item">
            <p className="allocation-text">Name: {key}</p>
            <p>Amount Allocated: {amountAllocated}</p>
            <p>Amount Spent: {amountSpent}</p>
            <p>Purpose: {purpose}</p>
            <ol>
                {comments.map(each => <li>{each}</li>)}
            </ol>
            <button onClick={openModal}>Update</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="form-container">
            <h2 className="form-name">Allocation</h2>
            <button className="modal-close" onClick={closeModal}>close</button>
            </div>
          </Modal>
        </li>
    )
}

export default Allocation