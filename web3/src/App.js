import './App.css'
import Web3 from 'web3'
import {useEffect, useState} from "react";

function App() {

  const [metamask, setMetamask] = useState(true)
  const [login, setLogin] = useState(false)
  const [balance, setBalance] = useState('')

  useEffect(() => {
    if (window.ethereum || window.web3) return
    setMetamask(false)
  },[])

  const detectCurrentProvider = () => {
    let provider
    if (window.ethereum) provider = window.ethereum
    if (window.web3) provider = window.web3.currentProvider
    return provider
  }

  const handleLogin = async() => {
    try {
      const currentProvider = detectCurrentProvider()
      if (currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(currentProvider)
        const userAccount = await web3.eth.getAccounts()
        const account = userAccount[0]
        const ethBalance = await web3.eth.getBalance(account)
        setBalance(ethBalance)
        setLogin(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    setLogin(false)
  }

  return (
    <>
      {!metamask ? (
          <h1>You should have METAMASK installed to use this DAPP</h1>
      ) : ( !login ? (
              <>
                <h1>Login with METAMASK</h1>
                <button onClick={handleLogin}>
                  Login
                </button>
              </>
          ) : (
              <>
                <h1>Succesfully login with METAMASK</h1>
                <h2>Your balance is: {balance}eth</h2>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </>
          )

      )}
    </>
  )
}

export default App;
