import { useState, useEffect } from "react"

export default function Register({ wallet, contractId }) {
    const [registerFromBlockchain, setRegisterFromBlockchain] = useState([]);
    const [loadRegisterFromBlockchain, setLoadRegisterFromBlockchain] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        if(wallet.accountId === contractId) {
            setIsAdmin(true)
        }
    }, [])

    async function handleClick() {
        try {
            const rsAdd = await wallet.callMethod({
                method: 'addRegister',
                args: {},
                contractId: contractId
            })

            setLoadRegisterFromBlockchain(!loadRegisterFromBlockchain)

            alert("Register successfully!")

            // return rsAdd;

        } catch (error) {
            console.log(error)
            
        }
        return false

    }

    function viewAllRegisterFromAdmin() {
        try {
            return wallet.viewMethod({ method: 'viewListRegister', contractId })
        } catch (error) {
            return [];
        }
    }



    useEffect(() => {
        viewAllRegisterFromAdmin()
            .then(rs => {
                const pairs = rs.split(" ");
                pairs.pop()
                let result = []

                for (let pair of pairs) {
                    let [name, value] = pair.split(',');
                    result.push({ "name": name});
                }
                setRegisterFromBlockchain(result);
            })
    }, [loadRegisterFromBlockchain]);

    function handleClickRemove(register) {
        console.log(register)
        try {
            wallet.callMethod({
                method: 'removeRegister',
                args: {idRegister: register},
                contractId: contractId
            }) .then(rs => console.log("REMOVE: ", rs))

            setLoadRegisterFromBlockchain(!loadRegisterFromBlockchain)

            return true;

        } catch (error) {
            console.log(error)
        }
        return false
    }

    function handleClickAccept(register) {
        try {
            wallet.callMethod({
                method: 'acceptRegister',
                args: {idRegister: register},
                contractId: contractId
            }) .then(rs => console.log("Accept: ", rs))

            setLoadRegisterFromBlockchain(!loadRegisterFromBlockchain)

            return true;

        } catch (error) {
            console.log(error)
        }
        return false
    }

    function ListRegister() {
        return (
            <div>
            <p>List Register</p>
            <div>
                {registerFromBlockchain.map((register, index) => (
                    <div>
                        <p >{register.name}</p>
                        <button key={register.name} onClick={() => handleClickRemove(register.name)}>X</button>
                        <button key={index} onClick={() => handleClickAccept(register.name)}>Accept</button>
                    </div>

                ))}
            </div>
            
            </div>
        )
    }

    return (
        <>
            {isAdmin && <ListRegister/>}
            <p>Register Philanthropist</p>
            <button onClick={handleClick}>Register</button>
        </>
    )
}

