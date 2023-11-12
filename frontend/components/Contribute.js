import { useState } from "react"

export default Contribute = ({wallet, contractId}) => {
    const [contributeName, setContributeName] = useState("");
    const [contributeValue, setContributeValue] = useState(0);
  

    const handleContribute = () => {
        wallet.callMethod({
          method: 'contributePrice',
          args: { idPhilanthropist: contributeName },
          deposit: contributeValue,
          contractId
        })
          .then(rs => {
            const condition = !rs || !rs.status || !rs.status.SuccessValue || true
            if (condition) {
              alert("The name or value is invalid.")
            }
          })
      }
    

    return (
        <div>
        <input
          onChange={e => setContributeName(e.target.value)}
          placeholder='charity...'
          value={contributeName}
        />
        <input
          onChange={e => setContributeValue(e.target.value)}
          placeholder='amount...'
          value={contributeValue}
        />
        <button onClick={handleContribute}>Contribute</button>
      </div>
    )
}