import { useState, useEffect } from "react"
import { utils } from "near-api-js"

export default CharityValue = ({ wallet, contractId, refreshPage }) => {
    const [charityFromBlockchain, setCharityFromBlockchain] = useState([]);

    useEffect(() => {
        getAllCharity()
            .then(rs => {
                console.log("RS_charity: ", rs)

                const pairs = rs.split(" ");
                pairs.pop()

                let result = []

                for(let pair of pairs) {
                    let [name, value] = pair.split(',');
                    result.push({ "name": name, "value": utils.format.formatNearAmount(value)});
                }

                setCharityFromBlockchain(result)
            })
    }, [refreshPage]);

    function getAllCharity() {
        return wallet.viewMethod({ method: 'viewListPhilanthropist', contractId })
    }

    return (
        <div>
            <p>List Philanthropist</p>
            {charityFromBlockchain.map((charity) => (
                <>
                    <p key={charity.name}>{charity.name} : {charity.value} Near</p>
                </>
            ))}

        </div>

    )
}