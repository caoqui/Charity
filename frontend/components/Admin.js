import { useState, useEffect } from "react"

export default function Admin({ wallet, contractId }) {
    const [idPhilanthropist, setIdPhilanthropist] = useState();
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        if (wallet.accountId === contractId) {
            setIsAdmin(true)
        }
    }, [])

    const handleClick = () => {
        wallet.callMethod({
            method: 'addPhilanthropist',
            args: { philanthropist: idPhilanthropist },
            contractId: contractId
        })

        setIdPhilanthropist(null)

        return true;
    }

    function InPage() {
        return (
            <div>
                <p>Admin Page</p>
                <input onChange={e => setIdPhilanthropist(e.target.value)} />
                <button onClick={handleClick}>Register</button>
            </div>
        )
    }

    return (
        <>
            {isAdmin && <InPage />}
        </>
    )
}

