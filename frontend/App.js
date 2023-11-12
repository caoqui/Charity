
import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';


import Router from './components/Router';

export default function App({ isSignedIn, contractId, wallet }) {

  // / If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()} />;
  }



  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
        <Router wallet={wallet} contractId={contractId} />
    </>

  );

}

