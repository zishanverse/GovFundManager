// This page opens to view individual allocation

// People can view amount-spent and purpose
// People can add immutable comments
// Check if connected wallet is creator of allocation and only he can update
// amount spent from this page


const Allocation = props => {
    const {item} = props
    const {amountAllocated, amountSpent, purpose, comments, key} = item

    return (
        <li className="allocation-item">
            <p className="allocation-text">Name: {key}</p>
            <p>Amount Allocated: {amountAllocated}</p>
            <p>Amount Spent: {amountSpent}</p>
            <p>Purpose: {purpose}</p>
            <ol>
                {comments.map(each => <li>{each}</li>)}
            </ol>
            
        </li>
    )
}

export default Allocation