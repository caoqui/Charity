import { useState } from "react"

import Admin from "./Admin"
import Register from "./Register"
import Contribute from "./Contribute"
import CharityValue from './CharityValue';
import Reedem from './Reedem';

export default Router = ({ wallet, contractId }) => {
    const [inAdmin, setInAdmin] = useState(false)
    const [inRegister, setInRegister] = useState(false)
    const [inHome, setInHome] = useState(true)
    const [inReedem, setInReedem] = useState(false)


    const handleClickHome = () => {
        setInHome(true);
        setInAdmin(false);
        setInRegister(false);
        setInReedem(false);
    }

    const handleClickAdmin = () => {
        setInHome(false);
        setInAdmin(true);
        setInRegister(false);
        setInReedem(false);
    }

    const handleClickRegister = () => {
        setInHome(false);
        setInAdmin(false);
        setInRegister(true);
        setInReedem(false);
    }

    const handleClickReedem = () => {
        setInHome(false);
        setInAdmin(false);
        setInRegister(false);
        setInReedem(true);
    }

    return (
        <>
            <nav>
                < button onClick={handleClickHome}>Home</button>
                < button onClick={handleClickAdmin}>Admin</button>
                < button onClick={handleClickRegister}>Register</button>
                < button onClick={handleClickReedem}>Reedem</button>
            </nav>
            <main>
            {inAdmin && <Admin wallet={wallet} contractId={contractId} />}
            {inHome &&  <CharityValue wallet={wallet} contractId={contractId} />}
            {inHome && <Contribute wallet={wallet} contractId={contractId} />}
            {inRegister && <Register wallet={wallet} contractId={contractId} />}
            {inReedem && <Reedem wallet={wallet} contractId={contractId} />}
            </main>
        </>
    )
}