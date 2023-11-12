import { useEffect, useState } from "react";

export default Reedem = ({ wallet, contractId }) => {
    const [isReedem, setIsReedem] = useState(false);

    useEffect(() => {
        wallet.viewMethod({ method: 'viewListPhilanthropist', contractId })
            .then(rs => {
                const pairs = rs.split(" ");

                for (let pair of pairs) {
                    let [name, value] = pair.split(',');
                    if (name === wallet.accountId) {
                        setIsReedem(true);
                    }
                }
            })
    }, [])

    function handleReedem() {
        try {
            wallet.callMethod({
                method: 'reedemOne',
                args: {},
                contractId: contractId
            }).then(rs => {
                setIsReedem(false)
                console.log("Reedemed: ", rs)
            })
        } catch (error) {
            console.log(error)
        }
    }

    function ReedemComponet() {
        return (
            <main>
                <button onClick={handleReedem}>Reedem</button>
            </main>
        )
    }

    return (
        <main>
            <h1>The Reedem</h1>
            <br></br>
            <br></br>
            <br></br>
            {isReedem && <ReedemComponet />}
        </main>
    )
}